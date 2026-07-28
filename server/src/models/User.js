import mongoose from "mongoose";
import { lowercase } from "zod";

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
    },
    lname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      uniqe: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
