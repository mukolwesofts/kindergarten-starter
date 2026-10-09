import { defineConfig } from "drizzle-kit";

const url = process.env.TURSO_DATABASE_URL ?? "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN || undefined;

export default defineConfig({
  dialect: "turso",
  schema: "./src/features/**/schema.ts",
  out: "./drizzle",
  dbCredentials: { url, authToken: authToken ?? "" },
});
