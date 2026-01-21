import { Router } from "express";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  publishAVideo,
  togglePublishStatus,
  updateVideo,
} from "../controllers/video.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/publish-video").post(
  verifyJWT,
  upload.fields([
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo
);

router.route("/v/:videoId").get(verifyJWT, getVideoById)
router.route("/delete-video/:videoId").delete(verifyJWT, deleteVideo)
router.route("/toggle-publish-status/:videoId").post(verifyJWT, togglePublishStatus)
router.route("/update-video/:videoId").patch(
  verifyJWT,
  upload.fields([
    {
      name: "video",
      maxCount: 1
    },
    {
      name: "thumbnail",
      maxCount: 1
    }
  ]), 
  updateVideo
)

router.route("/get-all-videos").get(verifyJWT, getAllVideos)

export default router;
