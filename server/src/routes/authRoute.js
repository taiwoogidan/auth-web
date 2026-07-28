import express from "express";
import { profile, signin, signup } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", authMiddleware, profile);

export default router;
