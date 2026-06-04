import "dotenv/config";

export const env = {
  clientOrigin: process.env.CLIENT_ORIGIN || "http://127.0.0.1:5174",
  jwtSecret: process.env.JWT_SECRET || "blog-platform-dev-secret",
  mongoUri: process.env.MONGODB_URI,
  port: process.env.PORT || 5050
};
