import { Router } from "express";
import { comment, create, index, like, remove, show, update } from "../controllers/post.controller.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", asyncHandler(index));
router.get("/:id", asyncHandler(show));
router.post("/", requireAuth, asyncHandler(create));
router.put("/:id", requireAuth, asyncHandler(update));
router.delete("/:id", requireAuth, asyncHandler(remove));
router.post("/:id/comments", requireAuth, asyncHandler(comment));
router.post("/:id/like", requireAuth, asyncHandler(like));

export default router;
