import { Router } from "express";
import { databaseStatus } from "../config/db.js";
import { Post } from "../models/Post.js";
import authRoutes from "./auth.routes.js";
import postRoutes from "./post.routes.js";

const router = Router();

router.get("/health", async (_req, res) => {
  res.json({
    ok: true,
    storage: "mongodb-atlas",
    database: databaseStatus(),
    posts: await Post.countDocuments()
  });
});

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);

export default router;
