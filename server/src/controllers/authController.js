import { success } from "zod";
import User from "../models/User.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  try {
    let { fname, lname, email, password } = req.body;
    if (!fname || !lname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    fname = fname?.trim();
    lname = lname?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(409).json({
        success: false,
        message: "Email already exist",
      });
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password does not meet requirement",
      });
    }

    const hashedPassword = await argon2.hash(password);
    const user = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==============================Singin controller
export const signin = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email?.trim().toLowerCase();
    password = password?.trim();
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const hashedPassword = await argon2.verify(user.password, password);
    if (!hashedPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      success: true,
      message: "signin successful",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
};
