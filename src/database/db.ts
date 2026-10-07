import "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

export const db = drizzle("sqlite.db");
