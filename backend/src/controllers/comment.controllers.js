import { Comment } from "../models/comment.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Video } from "../models/video.models.js"

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if(!videoId){
    throw new ApiError(401, "Video Id is required")
  }

  let { page = 1, limit = 10 } = req.query;

  page = parseInt(page)
  limit = parseInt(limit)

  const comments = await Comment.find({ video: videoId })
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
     
  if (comments.length === 0) {
    throw new ApiError(404, "Comments not found.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, comments, "Comments retrieved successfully.")
    );
});

const addComment = asyncHandler(async(req, res) => {
  if (!req.body) {
    throw new ApiError(400, "Request body is empty");
  }

  const { videoId } = req.params
  const { content } = req.body

  //validation
  if(!content){
    throw new ApiError(400, "comment is required")
  }

  if(!videoId){
    throw new ApiError(400, "video id is required")
  }

  const video = await Video.findById(videoId)

  if(!video){
    throw new ApiError(400, "invalid video id")
  }
  
  try {
    const comment = await Comment.create({
      video: videoId,
      content,
      owner: req.user._id
    })
  
    const createdComment = await Comment.findById(comment._id)

    if(!createdComment){
      throw new ApiError(400, "Add comment failed")
    }
    
    return res.status(200).json(new ApiResponse(200, comment, "Comment Added") )

  } catch (error) {
    throw new ApiError(400, error.message || "Error in adding comment")
  }
})

const updateComment = asyncHandler(async(req, res) => {
  if(!req.body){
    throw new ApiError(400, "Request body is empty")
  }

  const {commentId} = req.params
  const { newComment } = req.body

  if(!newComment){
    throw new ApiError(400, "Add a new comment")
  }

  if(!commentId){
    throw new ApiError(500, "No comment is found")
  } 

  const comment = await Comment.findById(commentId)
  
  if(!comment){
    throw new ApiError(400, "Comment not exist")
  }

  comment.content = newComment
  await comment.save({ validateBeforeSave: false });
  
  return res.status(200).json(new ApiResponse(200, comment, "Comment updated"))
})

const deleteComment = asyncHandler(async(req, res) => {
  const {commentId} = req.params
  if(!commentId){
    throw new ApiError(400, "Comment id is required")
  }

  const comment = await Comment.findByIdAndDelete(commentId)

  if(!comment){
    throw new ApiError(400, "Comment not found")
  }

  return res.status(200).json(new ApiResponse(200, comment, "Comment deleted"))
})

export {
  getVideoComments,
  addComment,
  updateComment,
  deleteComment
}
