import express from "express";
import multer from "multer";
import {
  createNews,
  deleteNews,
  dislikeNews,
  getNews,
  getNewsById,
  getNewsByTag,
  getNewsStats,
  incrementViews,
  likeNews,
} from "../controllers/newsController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.array("pictures", 5), createNews);
router.get("/", getNews);
router.get("/stats", getNewsStats);
router.get("/:id", getNewsById);
router.post("/:id/view", incrementViews);

router.get("/tag/:tag", getNewsByTag);
router.post("/:id/like", likeNews);
router.post("/:id/dislike", dislikeNews);
router.delete("/:id", deleteNews);

export default router;
