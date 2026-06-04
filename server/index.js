import app from "./app.js";
import { connectDatabase, databaseStatus } from "./config/db.js";
import { env } from "./config/env.js";
import { ensureSampleData } from "./seed/sampleData.js";

connectDatabase()
  .then(async () => {
    const result = await ensureSampleData(20);
    const database = databaseStatus();
    console.log(`MongoDB database: ${database.name} on ${database.host}`);
    console.log(`Sample data ready. Added ${result.addedPosts} posts. Total posts: ${result.totalPosts}.`);

    app.listen(env.port, () => {
      console.log(`API running on http://127.0.0.1:${env.port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start API:", error.message);
    process.exit(1);
  });
