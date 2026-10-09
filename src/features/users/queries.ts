import "server-only";
import { db } from "@/lib/db";
import { users, type User } from "./schema";
import { eq, like, desc, count, max, and, ne } from "drizzle-orm";

export async function getUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase()));
  return user ?? null;
}

export async function listUsers(search?: string): Promise<User[]> {
  const term = search?.trim();
  return db
    .select()
    .from(users)
    .where(term ? like(users.email, `%${term}%`) : undefined)
    .orderBy(desc(users.createdAt));
}

export async function userStats() {
  const [totals] = await db
    .select({
      total: count(),
      lastLogin: max(users.lastLoginAt),
    })
    .from(users);
  const [activeRow] = await db
    .select({ n: count() })
    .from(users)
    .where(eq(users.active, true));
  return {
    total: totals?.total ?? 0,
    active: activeRow?.n ?? 0,
    lastLoginAt: totals?.lastLogin ?? null,
  };
}

export async function countActiveAdmins(excludeId?: number) {
  const conditions = [eq(users.role, "admin"), eq(users.active, true)];
  if (excludeId !== undefined) conditions.push(ne(users.id, excludeId));
  const [row] = await db
    .select({ n: count() })
    .from(users)
    .where(and(...conditions));
  return row?.n ?? 0;
}
