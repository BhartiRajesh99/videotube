import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

import {
  toggleSubscription,
  getSubscribedChannels,
  getUserChannelSubscribers,
} from "../controllers/subscription.controllers.js";

router.use(verifyJWT);

router.route("/subscribe/:channelId").post(toggleSubscription);
router.route("/subscribers/:channelId").post(getUserChannelSubscribers);
router.route("/subscribed-channels/:subscriberId").post(getSubscribedChannels);

export default router;
