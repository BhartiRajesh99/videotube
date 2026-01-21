import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { toggleCommentLike, getLikedVideos, toggleTweetLike, toggleVideoLike } from "../controllers/like.controllers.js";

const router = Router()

router.use(verifyJWT)

router.route("/like-comment/:commentId").get(toggleCommentLike)
router.route("/liked-videos").get(getLikedVideos)
router.route("/like-tweet/:tweetId").get(toggleTweetLike)
router.route("/like-video/:videoId").get(toggleVideoLike)

export default router