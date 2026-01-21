import {Router} from "express"
import { addComment, deleteComment, getVideoComments, updateComment } from "../controllers/comment.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.use(verifyJWT)

router.route("/all-comments/:videoId").get(getVideoComments)
router.route("/add-comment/:videoId").post(addComment)
router.route("/update-comment/:commentId").post(updateComment)
router.route("/delete-comment/:commentId").delete(deleteComment)

export default router