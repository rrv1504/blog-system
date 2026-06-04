import { Router } from "express";
import { login, me, profile, register, updateMe } from "../controllers/auth.controller.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.get("/me", requireAuth, me);
router.get("/profile", requireAuth, asyncHandler(profile));
router.put("/me", requireAuth, asyncHandler(updateMe));

export default router;
