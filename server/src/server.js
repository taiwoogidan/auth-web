import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { connectRedis } from "./config/redis.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    // await connectRedis();

    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`),
    );
  } catch (error) {
    console.error(error);
  }
}

startServer();
