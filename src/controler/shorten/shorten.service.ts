import { randomBytes } from "node:crypto";
import { db } from "../../database/db.js";
import { urls } from "../../database/schema/urls.js";
import { eq } from "drizzle-orm";

class ShortenService {
  static generateCode() {
    return randomBytes(5).toString("hex");
  }

  static async create(longUrl: string) {
    let isCodeTaken = true;
    let randomCode = "";
    let retry = 0;
    while (isCodeTaken && retry <= 3) {
      randomCode = this.generateCode();
      isCodeTaken = !!randomCode;
      retry++;
    }

    if (retry >= 3) return [];

    const results = db
      .insert(urls)
      .values({
        longUrl,
        code: randomCode,
        views: 0,
      })
      .returning();

    return results;
  }

  static async show(shortCode: string) {
    return db.select().from(urls).where(eq(urls.code, shortCode)).get();
  }

  static async edit(longUrl: string) {
    return db
      .update(urls)
      .set({ longUrl: longUrl })
      .where(eq(urls.longUrl, longUrl))
      .returning();
  }

  static destroy(shortCode: string) {
    return db.delete(urls).where(eq(urls.code, shortCode)).returning().get();
  }

  static details(shortCode: string) {
    return this.show(shortCode);
  }
}

export default ShortenService;
