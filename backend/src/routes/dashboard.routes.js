import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middlewares.js"

const router = Router()

//import routes
import { getChannelStats, getChannelVideos } from "../controllers/dashboard.controllers.js"

router.use(verifyJWT)

router.route("/channel-videos").get(getChannelVideos)
router.route("/channel-stats").get(getChannelStats)

export default router