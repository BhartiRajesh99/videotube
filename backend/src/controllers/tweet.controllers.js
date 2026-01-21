import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  //TODO: create tweet
  if(!req.body){
    throw new ApiError(400, "req body is empty")
  }

  const { content } = req.body

  if(!content){
    throw new ApiError(400, "tweet is required")
  }

  const tweet = await Tweet.create({
    content: content,
    owner: req.user._id
  })

  if(!tweet){
    throw new ApiError(400, "Error creating tweet")
  }

  return res.status(200).json(new ApiResponse(200, tweet, "Tweet created successfully"))
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets
  const pipeline = [
    {
      $match: {
        owner: new mongoose.Types.ObjectId(req.user._id),
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
                    username: 1,
                    fullname: 1,
                    email: 1
                }
            }
        ]
      },
    },
    {
      $addFields: {
        owner: {
          $arrayElemAt: ["$owner", 0],
        },
      },
    },
  ];

  const tweets = await Tweet.aggregate(pipeline)

  if(!tweets){
    throw new ApiError(400, "no tweets found")
  }

  return res.status(200).json(new ApiResponse(200, tweets, "Tweets fetched successfull"))

});

const updateTweet = asyncHandler(async (req, res) => {
  //TODO: update tweet

  if (!req.body) {
    throw new ApiError(400, "req body is empty");
  }

  const { tweetId } = req.params
  const { content } = req.body

  if(!isValidObjectId(tweetId) || !tweetId){
    throw new ApiError(400, "Invalid tweet id")
  }

  if(!content){
    throw new ApiError(400, "new tweet is required")
  }

  const tweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
        $set : {
            content: content
        }
    },
    {new : true}
  )

  if(!tweet){
    throw new ApiError(400, "error updating tweet")
  }

  return res.status(200).json(new ApiResponse(200, tweet, "tweet updted successfull"))
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet
  const { tweetId } = req.params

  if(!isValidObjectId(tweetId) || !tweetId){
    throw new ApiError(400, "Invalid tweet id")
  }

  const tweet = await Tweet.findByIdAndDelete(tweetId)

  if(!tweet){
    throw new ApiError(400, "Tweet not found")
  }

  return res.status(200).json(new ApiResponse(200, tweet, "tweet deleted successfull"))

});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
