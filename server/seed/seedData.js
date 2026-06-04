import mongoose from "mongoose";
import { connectDatabase } from "../config/db.js";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";
import { demoUsers, ensureSampleData } from "./sampleData.js";

async function seed() {
  const reset = process.argv.includes("--reset");

  await connectDatabase();

  if (reset) {
    await Promise.all([Post.deleteMany({}), User.deleteMany({ email: { $in: demoUsers.map((user) => user.email) } })]);
  }

  const result = await ensureSampleData(20);

  console.log(`Seed complete. Added ${result.addedPosts} posts. Total posts: ${result.totalPosts}.`);
  console.log("Demo login: aarav@example.com / Password123");
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
