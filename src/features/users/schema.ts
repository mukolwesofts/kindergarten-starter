import {
  sqliteTable,
  text,
  integer,
  index,
} from "drizzle-orm/sqlite-core";

export const userRoles = ["admin", "editor"] as const;
export type UserRole = (typeof userRoles)[number];

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    role: text("role", { enum: userRoles }).notNull().default("editor"),
    active: integer("active", { mode: "boolean" }).notNull().default(true),
    createdAt: integer("created_at").notNull(),
    updatedAt: integer("updated_at").notNull(),
    lastLoginAt: integer("last_login_at"),
  },
  (t) => [index("users_email_idx").on(t.email)],
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

/** Unix timestamp in seconds — all *_at columns use this. */
export function now() {
  return Math.floor(Date.now() / 1000);
}
