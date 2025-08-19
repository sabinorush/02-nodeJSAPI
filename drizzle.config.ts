import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();
const databaseUrl = process.env.DATA_BASE_URL;
if (!databaseUrl) {
  throw new Error("Please set the DATABASE_URL environment variable");
}

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
  out: "./drizzle",
  schema: "./src/database/schema.ts",
});
