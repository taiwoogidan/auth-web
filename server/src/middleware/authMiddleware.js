import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import { success } from "zod";
dotenv.config();

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization error",
      });
    }
    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        massage: "Invalid token",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authorization error",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
  }
}
