import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

import {
  createPlaylist,
  getUserPlaylists,
  addVideoToPlaylist,
  getPlaylistById,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
} from "../controllers/playlist.controllers.js";

router.use(verifyJWT);

router.route("/create-playlist").post(createPlaylist);
router.route("/user-playlists/:userId").post(getUserPlaylists);
router.route("/add-video/:playlistId/:videoId").post(addVideoToPlaylist);
router.route("/get-playlist/:playlistId").post(getPlaylistById);
router.route("/remove-video/:playlistId/:videoId").post(removeVideoFromPlaylist);
router.route("/delete-playlist/:playlistId").post(deletePlaylist);
router.route("/update-playlist/:playlistId").patch(updatePlaylist);

export default router;
