import "server-only";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const url = process.env.TURSO_DATABASE_URL ?? "file:local.db";

const globalForDb = globalThis as unknown as {
  libsqlClient: ReturnType<typeof createClient> | undefined;
};

const client =
  globalForDb.libsqlClient ??
  createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN || undefined,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.libsqlClient = client;
}

export const db = drizzle(client);
