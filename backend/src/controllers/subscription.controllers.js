import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.models.js";
import { Subscription } from "../models/subscription.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  // TODO: toggle subscription
  if (!channelId || !isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel id");
  }

  const channel = await User.findById(channelId);

  if (!channel) {
    throw new ApiError(400, "channel not existed");
  }

  const subscriberId = req.user._id;

  const isSubscrbed = await Subscription.findOne({
    subscriber: subscriberId,
    channel: channelId,
  });

  if (isSubscrbed) {
    const deletedSubcriber = await Subscription.findByIdAndDelete(
      isSubscrbed._id
    );

    return res
      .status(200)
      .json(
        new ApiResponse(200, deletedSubcriber, "Unsubscribbed successfull")
      );
  }

  const newSubscribed = await Subscription.create({
    subscriber: subscriberId,
    channel: channelId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newSubscribed, "Subscribed successfully"));
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!channelId || !isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel id");
  }

  const channel = await User.findById(channelId)

  if(!channel){
    throw new ApiError(500, "channel not exist")
  }

  const pipeline = [
    {
      $match: {
        channel: new mongoose.Types.ObjectId(channelId),
      },
    },
    {
      $group: {
        _id: "$channel",
        subscribersArray: {
          $push: "$subscriber",
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscribersArray",
        foreignField: "_id",
        as: "subscribersArray",
        pipeline: [
          {
           	$project: {
              _id: 1,
              username: 1,
              fullname: 1,
              avatar: 1,
            }
          }
        ]
      },
    },
    {
      $addFields: {
        totalSubscribers: {
          $size: "$subscribersArray",
        },
      },
    },
  ];


  const totalSubscribers = await Subscription.aggregate(pipeline)

  return res.status(200).json(new ApiResponse(200, totalSubscribers, "subscribers fetched successfully"))

});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  if (!subscriberId || !isValidObjectId(subscriberId)) {
    throw new ApiError(400, "Invalid channel id");
  }

  const subscriber = await User.findById(subscriberId)

  if(!subscriber){
    throw new ApiError(400, "subscriber not exist")
  }

  const pipeline = [
    {
      $match: {
        subscriber: new mongoose.Types.ObjectId(subscriberId),
      },
    },
    {
      $group: {
        _id: "$subscriber",
        subscribedChannelsArray: {
          $push: "$channel",
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscribedChannelsArray",
        foreignField: "_id",
        as: "subscribedChannelsArray",
        pipeline: [
          {
            $project: {
              _id: 1,
              fullname: 1,
              username: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        totalSubscribedChannel: {
          $size: "$subscribedChannelsArray",
        },
      },
    },
  ];

  const subscribedCount = await Subscription.aggregate(pipeline)

  return res
    .status(200)
    .json(new ApiResponse(200, subscribedCount, "subscribedCount fetched successfully"));

});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
