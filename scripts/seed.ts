/**
 * Creates the first admin user from SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD.
 * Safe to run twice — existing admins are left untouched.
 *
 * Run: pnpm db:seed
 */
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { users, now } from "../src/features/users/schema";

try {
  process.loadEnvFile();
} catch {
  // .env is optional — env vars may come from the shell or CI.
}

const url = process.env.TURSO_DATABASE_URL ?? "file:local.db";
const email = (process.env.SEED_ADMIN_EMAIL ?? "").trim().toLowerCase();
const password = process.env.SEED_ADMIN_PASSWORD ?? "";

if (!email || !password) {
  console.error(
    "Missing SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD — set them in .env first.",
  );
  process.exit(1);
}

const client = createClient({
  url,
  authToken: process.env.TURSO_AUTH_TOKEN || undefined,
});
const db = drizzle(client);

async function main() {
  const existing = await db.select().from(users).where(eq(users.email, email));

  if (existing.length > 0) {
    console.log(`Admin ${email} already exists — nothing to do.`);
    return;
  }

  const ts = now();
  await db.insert(users).values({
    name: "Site Admin",
    email,
    passwordHash: await bcrypt.hash(password, 12),
    role: "admin",
    active: true,
    createdAt: ts,
    updatedAt: ts,
    lastLoginAt: null,
  });

  console.log(`Created admin user: ${email}`);
}

main()
  .then(() => client.close())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
