import "server-only";
import { db } from "@/lib/db";
import { loginAttempts } from "./schema";
import { eq, and, gte, count } from "drizzle-orm";
import { now } from "@/features/users/schema";

const WINDOW_SECONDS = 15 * 60;
const MAX_ATTEMPTS = 5;

// NOTE: identifier is the attempted email address. For per-IP limiting,
// capture the client IP from headers in the login action and store it
// here alongside (or instead of) the email.

export async function tooManyAttempts(identifier: string) {
  const since = now() - WINDOW_SECONDS;
  const [row] = await db
    .select({ n: count() })
    .from(loginAttempts)
    .where(
      and(
        eq(loginAttempts.identifier, identifier),
        gte(loginAttempts.createdAt, since),
      ),
    );
  return (row?.n ?? 0) >= MAX_ATTEMPTS;
}

export async function recordFailedAttempt(identifier: string) {
  await db
    .insert(loginAttempts)
    .values({ identifier, createdAt: now() });
}

export async function clearAttempts(identifier: string) {
  await db.delete(loginAttempts).where(eq(loginAttempts.identifier, identifier));
}
