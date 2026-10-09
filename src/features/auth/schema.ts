import {
  sqliteTable,
  text,
  integer,
  index,
} from "drizzle-orm/sqlite-core";

export const loginAttempts = sqliteTable(
  "login_attempts",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    identifier: text("identifier").notNull(),
    createdAt: integer("created_at").notNull(),
  },
  (t) => [index("login_attempts_identifier_idx").on(t.identifier)],
);
