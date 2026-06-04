import mongoose from "mongoose";
import { env } from "./env.js";

function explainConnectionError(error) {
  const message = error?.message || "Unknown MongoDB connection error.";
  const hints = [];

  if (/ECONNRESET|timed out|ENOTFOUND|querySrv|server selection/i.test(message)) {
    hints.push("check your internet connection and MongoDB Atlas network access/IP allowlist");
  }

  if (/auth|Authentication failed|bad auth/i.test(message)) {
    hints.push("check the MongoDB username/password and URL-encode special characters in the password");
  }

  if (!hints.length) {
    return message;
  }

  return `${message}. Try to ${hints.join(" and ")}.`;
}

export async function connectDatabase() {
  if (!env.mongoUri) {
    throw new Error("MONGODB_URI is required. Add your MongoDB Atlas connection string to .env.");
  }

  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 10000
    });
  } catch (error) {
    throw new Error(explainConnectionError(error), { cause: error });
  }

  console.log("Connected to MongoDB Atlas");
}

export function databaseStatus() {
  return {
    connected: mongoose.connection.readyState === 1,
    host: mongoose.connection.host,
    name: mongoose.connection.name
  };
}
