import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.models.js";
import { Video } from "../models/video.models.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Comment } from "../models/comment.models.js";
import { Tweet } from "../models/tweet.models.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle like on video

  if(!isValidObjectId(videoId)){
    throw new ApiError(404, "Invalid video id")
  }

  const video = await Video.findById(videoId)

  if(!video){
    return res.status(400).json(new ApiResponse(400, {}, "video not found"))
  }

  const likedVideo = await Like.findOne({
    video: videoId,
    likedBy: req.user._id
  })


  if(likedVideo){
    await likedVideo.deleteOne()
    return res.status(200).json(new ApiResponse(200, {}, "Video unliked"));
  } else {
    const newLike = await Like.create({
        video: videoId,
        likedBy: req.user._id
    })
    return res.status(200).json(new ApiResponse(200, newLike, "video liked"))
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment

  if(!isValidObjectId(commentId)){
    throw new ApiError(400, "invalid comment id")
  }

  const comment = await Comment.findById(commentId)

  if(!comment){
    throw new ApiError(400, "Comment not exist")
  }

  const alreadyLiked = await Like.findOne({
    likedBy: req.user._id,
    comment: commentId
  })

  if(alreadyLiked){
    await alreadyLiked.deleteOne()
    return res.status(200).json(new ApiResponse(200, {}, "comment unliked"))
  } else {
    // const newLikedComment = await Like.findOne({video: comment.video})
    // newLikedComment.comment = commentId
    // await newLikedComment.save({validateBeforeSave: false})

    const newLikedComment = await Like.create({
        likedBy: req.user._id,
        comment: commentId
    })

    if(!newLikedComment){
        throw new ApiError(400, "comment liked error")
    }
    
    return res
        .status(200)
        .json(new ApiResponse(200, newLikedComment, "comment liked"));
  }

});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet

  if(!isValidObjectId(tweetId)){
    throw new ApiError(404, "invalid tweet id")
  }

  const tweet = await Tweet.findById(tweetId)

  if(!tweet){
    throw new ApiError(404, "tweet not found")
  }

  const existingLikedTweet = await Like.findOne({
    likedBy: req.user._id,
    tweet: tweetId
  })

  if(existingLikedTweet){
    await existingLikedTweet.deleteOne()
    return res.status(200).json(new ApiResponse(200, {}, "tweet unliked"))
  } else {
    const newLikedTweet = await Like.create({
      likedBy: req.user._id,
      tweet: tweetId
    })

    if(!newLikedTweet){
      throw new ApiError(400, "Error liking tweet")
    }

    return res.status(200).json(new ApiResponse(200, newLikedTweet, "tweet liked"))
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
  const pipeline = [
    {
      $match: {
        video: { $exists: true },
      },
    },
  ];

  const videos = await Like.aggregate(pipeline)

  if(videos.length === 0)
      throw new ApiError(200, "videos not found")

  return res.status(200).json(new ApiResponse(200, videos, "videos fetched successfully"))

});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
