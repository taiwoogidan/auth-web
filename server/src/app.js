import express from "express";
import cors from "cors";
import router from "./routes/authRoute.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.get("/", (req, res) => {
    res.send("API is running");
});
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", router);
// console.log(process.env.JWT_SECRET);

export default app;
