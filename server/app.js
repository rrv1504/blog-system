import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";
import apiRoutes from "./routes/index.js";

const app = express();
const allowedOrigins = new Set([
  env.clientOrigin,
  "https://rrv1504.github.io",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
  "http://127.0.0.1:5176",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176"
]);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Not allowed by CORS."));
  }
}));
app.use(express.json({ limit: "1mb" }));

app.use("/api", apiRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
