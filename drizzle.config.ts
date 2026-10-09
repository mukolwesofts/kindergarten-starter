import { defineConfig } from "drizzle-kit";

const url = process.env.TURSO_DATABASE_URL ?? "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN || undefined;
const isLocalFile = url.startsWith("file:");

export default defineConfig(
  isLocalFile
    ? {
        dialect: "sqlite",
        schema: "./src/features/**/schema.ts",
        out: "./drizzle",
        dbCredentials: { url },
      }
    : {
        dialect: "turso",
        schema: "./src/features/**/schema.ts",
        out: "./drizzle",
        dbCredentials: { url, authToken: authToken ?? "" },
      },
);
