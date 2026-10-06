import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const urls = sqliteTable("urls", {
  id: integer().primaryKey({ autoIncrement: true }),
  longUrl: text().notNull(),
  views: integer().default(0),
  code: text().notNull().unique(),
  createdAt: integer({ mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer({ mode: "timestamp" }).$defaultFn(() => new Date()),
});
