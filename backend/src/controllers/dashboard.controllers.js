import mongoose from "mongoose";
import { Video } from "../models/video.models.js";
import { Subscription } from "../models/subscription.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

  const channel = await User.findById(req.user._id);

  if (!channel) {
    throw new ApiError(400, "Channel not found");
  }

  const totalLikesAndViews = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(req?.user?._id),
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "likes",
      },
    },
    {
      $addFields: {
        likes: {
          $size: "$likes",
        },
      },
    },
    {
      $group: {
        _id: null,
        totalViews: {
          $sum: "$views",
        },
        totalLikes: {
          $sum: "$likes",
        },
      },
    },
  ]);

  const totalSubscribers = await Subscription.aggregate([
    {
      $match: {
        channel: new mongoose.Types.ObjectId(req?.user?._id),
      },
    },
    {
      $group: {
        _id: null,
        totalSubscribers: {
          $sum: 1,
        },
      },
    },
  ]);

  const totalVideos = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(req?.user?._id),
      },
    },
    {
      $group: {
        _id: null,
        totalVideos: {
          $sum: 1,
        },
      },
    },
  ]);


  const stats = totalLikesAndViews[0] || { totalViews: 0, totalLikes: 0 };

  const dashboardData = {
    videos: totalVideos[0].totalVideos,
    totalSubscribers: totalSubscribers[0].totalSubscribers,
    totalViews: stats.totalViews,
    totalLikes: stats.totalLikes,
  };

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        dashboardData,
        "The backend stats are fetched successfull"
      )
    );

});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel
  const ownerId = req.user._id;

  const pipeline = [
    {
      $match: {
        owner: ownerId,
      },
    },
    {
      $project: {
        _id: 1,
        videoFile: 1,
        thumbnail: 1,
        title: 1,
        description: 1,
        views: 1,
        isPublished: 1,
        owner: 1,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
              email: 1,
              fullname: 1,
              coverImage: 1,
              avatar: 1,
              watchHistory: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$owner",
    },
  ];

  const videos = await Video.aggregate(pipeline);

  //   const videos = await Video.find({
  //     owner: ownerId,
  //   });

  const message =
    videos.length === 0 ? "no videos found" : "videos fetched successfully";
  return res.status(200).json(new ApiResponse(200, videos, message));
});

export { getChannelStats, getChannelVideos };
