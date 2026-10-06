import { randomBytes } from "node:crypto";
import { db } from "../../database/db.js";
import { urls } from "../../database/schema/urls.js";
import { eq } from "drizzle-orm";
import { log } from "node:console";

class ShortenService {
  static generateCode() {
    return randomBytes(5).toString("hex");
  }

  static async create(longUrl: string) {
    try {
      let isCodeTaken = true;
      let randomCode = "";
      let retry = 0;
      log(longUrl);
      while (isCodeTaken && retry <= 3) {
        randomCode = this.generateCode();
        isCodeTaken = !!this.details(randomCode);
        retry++;
      }

      if (retry >= 3) return [];

      const results = db
        .insert(urls)
        .values({
          code: randomCode,
          url: longUrl,
          views: 0,
        })
        .returning()
        .get();

      return results;
    } catch (error) {
      log(error);
      return [];
    }
  }

  static async show(shortCode: string) {
    const oldData = this.details(shortCode);
    if (!oldData) return undefined;
    return db
      .update(urls)
      .set({
        views: oldData.views + 1,
      })
      .where(eq(urls.code, shortCode))
      .returning()
      .get();
  }

  static async edit(longUrl: string, code: string) {
    return await db
      .update(urls)
      .set({ url: longUrl })
      .where(eq(urls.code, code))
      .returning()
      .get();
  }

  static destroy(shortCode: string) {
    return db.delete(urls).where(eq(urls.code, shortCode)).returning().get();
  }

  static details(shortCode: string) {
    return db.select().from(urls).where(eq(urls.code, shortCode)).get();
  }
}

export default ShortenService;
