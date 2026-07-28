import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(currentDirectory, "../../.env") });

const connectionOptions = {
  connectTimeoutMS: 10_000,
  serverSelectionTimeoutMS: 10_000,
};

const fallbackDnsServers = (process.env.MONGO_DNS_SERVERS ?? "1.1.1.1,8.8.8.8")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

const isSrvLookupFailure = (mongoUri, error) =>
  mongoUri.startsWith("mongodb+srv://") &&
  error?.syscall === "querySrv" &&
  ["ECONNREFUSED", "ESERVFAIL", "ETIMEOUT"].includes(error.code);

const connect = (mongoUri) => mongoose.connect(mongoUri, connectionOptions);

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not set. Add it to server/.env before starting the server.");
  }

  try {
    const connection = await connect(mongoUri);

    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    if (isSrvLookupFailure(mongoUri, error) && fallbackDnsServers.length > 0) {
      console.warn(
        "MongoDB SRV lookup was refused by the local DNS resolver. Retrying with fallback DNS.",
      );

      dns.setServers(fallbackDnsServers);

      try {
        const connection = await connect(mongoUri);
        console.log(`MongoDB connected: ${connection.connection.host}`);
        return connection;
      } catch (retryError) {
        console.error(`MongoDB connection failed after DNS retry: ${retryError.message}`);
        throw retryError;
      }
    }

    console.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }
};

export default connectDB;
