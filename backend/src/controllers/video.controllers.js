import mongoose from "mongoose";
// import { User } from "../models/user.models.js";
import { Video } from "../models/video.models.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  
  const { page = 1, limit = 10, query = "", sortBy, sortType, userId } = req.query;

  const pageNum = parseInt(page)
  const limitNum = parseInt(limit)

  const pipeline = [
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
        title: { $regex: query, $options: "i" },
      },
    },
    {
      $sort: {
        [sortBy]: sortType === "dsc" ? -1 : 1,
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
              email: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        owner: { $arrayElemAt: ["$owner", 0] },
      },
    },
    {
      $skip: (pageNum - 1) * limitNum,
    },
    {
      $limit: limitNum,
    },
  ];

  const videos = await Video.aggregate(pipeline)
  
  if(!videos){
    throw new ApiError(400, "Videos not exist with this id")
  }

  res.status(200).json(new ApiResponse(200, videos, "Video fetched successfully"))

});

const publishAVideo = asyncHandler(async (req, res) => {

  if(!req.body){
    throw new ApiError(500, "Request body is empty")
  }  

  const { title, description } = req.body;
  const videoLocalPath = req.files?.video?.[0]?.path
  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path

  if(!videoLocalPath){
    throw new ApiError(400, "video file is missing")
  }
  if(!thumbnailLocalPath){
    throw new ApiError(400, "thumbnail is missing")
  }

  let videoFile;
  try {
    videoFile = await uploadOnCloudinary(videoLocalPath, "videotube/video")
    console.log(`Video file uploaded ${videoFile.url}`)
  } catch (error) {
    console.log(`Error uploading video : ${error}`);
    throw new ApiError(500, "Failed to upload video");
  }

  let thumbnailFile;
  try {
    thumbnailFile = await uploadOnCloudinary(thumbnailLocalPath, "videotube/thumbnail")
    console.log(`Thumbnail uploaded ${thumbnailFile.url}`);
    
  } catch (error) {
    console.log(`Error uploading thumbnail : ${error}`)
    throw new ApiError(500, "Failed to upload thumbnail")
  }

  try {
    const video = await Video.create({
        title,
        description,
        videoFile: [videoFile.secure_url, videoFile.public_id],
        thumbnail: [thumbnailFile.url, thumbnailFile.public_id],
        isPublished: true,
        owner: req.user._id,
        duration: videoFile.duration
    }) 

    const createdVideo = await Video.findById(video._id)

    if(!createdVideo){
        throw new ApiError(500, "Video not created")
    }

    return res.status(200).json(new ApiResponse(200, video, "Video published successfully"))

  } catch (error) {
    console.log("Video published failed")

    if(videoFile){
        await deleteFromCloudinary(videoFile.public_id, "video")
    }

    if(thumbnailFile){
        await deleteFromCloudinary(thumbnailFile.public_id, "image")
    }

    throw new ApiError(400, "Error video publishing ", error.message)
  }

});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id

  const video = await Video.findById(videoId)

  if(!video){
    throw new ApiError(500, "Invalid videoId")
  }

  return res.status(200).json(new ApiResponse(200, video, "video fetched successfully"))

});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail

  const { title, description } = req.body

  if([title, description].some(filed => filed.trim() === "")){
    throw new ApiError(400, "All fileds are required")
  }

  let newThumbnail, oldThumbnail, thumbnailLocalPath

  const thumbnailPipeline = [
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId)
      }
    },
    {
      $project: {
        thumbnail: 1
      }
    }
  ]

  oldThumbnail = await Video.aggregate(thumbnailPipeline);

  thumbnailLocalPath = req.files?.thumbnail?.[0].path
  
  if(!thumbnailLocalPath) {
    throw new ApiError(400, "thumbnail is required")
  }

  let newVideoFile, oldVideoFile, videoLocalPath

  const videoPipeline = [
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId)
      }
    },
    {
      $project: {
        videoFile: 1
      }
    }
  ]

  oldVideoFile = await Video.aggregate(videoPipeline);

  await deleteFromCloudinary(oldVideoFile[0].videoFile[1], "video")
  await deleteFromCloudinary(oldThumbnail[0].thumbnail[1], "image")

  videoLocalPath = req.files?.video?.[0].path
  
  if(!videoLocalPath) {
    throw new ApiError(400, "video file is required")
  }

  newVideoFile = await uploadOnCloudinary(videoLocalPath, "videotube/video")
  newThumbnail = await uploadOnCloudinary(thumbnailLocalPath, "videotube/thumbnail");

  if (!newThumbnail) {
    throw new ApiError(
      400,
      "something went wrong while uploading new thumbnail"
    );
  }

  if(!newVideoFile){
    throw new ApiError(400, "something went wrong while uploading new video")
  }

  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title,
        description,
        thumbnail: [newThumbnail?.url, newThumbnail?.public_id],
        videoFile: [newVideoFile?.url, newVideoFile?.public_id]
      },
    },
    {
      new: true,
    }
  );

  if(!updatedVideo){
    throw new ApiError(200, "error video updating")
  }

  return res.status(200).json(new ApiResponse(200, updatedVideo, "Video updated successfully"))

});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.findById(videoId)
  
  if(!video){
    throw new ApiError(400, "video not found")
  }

  await deleteFromCloudinary(video.videoFile[1], "video")
  await deleteFromCloudinary(video.thumbnail[1], "image")
  
  await Video.findByIdAndDelete(videoId)
  
  return res.status(200).json(new ApiResponse(200, video, "Video deleted successfully"))
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.findById(videoId)

  if(!video){
    throw new ApiError(500, "Video not found")
  }

  video.isPublished = !video.isPublished
  await video.save({validateBeforeSave: false})

  return res.status(200).json(new ApiResponse(200, video, "publish status toggled successfully"))
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};