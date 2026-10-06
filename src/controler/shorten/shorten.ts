import { Router, type Request, type Response } from "express";
import { validateBody } from "../../middleware/validateBody.js";
import Joi from "joi";
import ShortenService from "./shorten.service.js";
import { response } from "../../lib/serialisasi.js";

const route = Router();

const schemaShorten = Joi.object({
  url: Joi.string().required().uri(),
});

const validateShortCode = (code: string | [], res: Response) => {
  if (!code || Array.isArray(code)) {
    response.error(res, `params code is required`, 404);
    return false;
  }
  return true;
};

route.post(
  "/shorten",
  validateBody(schemaShorten),
  async (req: Request, res: Response) => {
    try {
      const longUrl = req.body.longUrl;
      const [resultsService] = await ShortenService.create(longUrl);
      if (!resultsService) return response.error(res);

      const { views, ...results } = resultsService;
      return response.success(res, results, "newly created short URL", 201);
    } catch (error) {
      return response.error(res);
    }
  },
);

route.get("/shorten/:code", async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const iscode = validateShortCode(code as string, res);
    if (!iscode) return;
    const resultsService = await ShortenService.show(code as string);
    if (!resultsService)
      return response.error(res, `${code} was not found`, 404);

    const { views, ...results } = resultsService;

    return response.success(res, results, "success get details", 200);
  } catch (error) {
    return response.error(res);
  }
});

route.delete("/shorten/:code", async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const iscode = validateShortCode(code as string, res);
    if (!iscode) return;

    const resultsService = ShortenService.destroy(code as string);
    if (!resultsService)
      return response.error(res, `${code} was not found`, 404);

    return res.status(203);
  } catch (error) {
    return response.error(res);
  }
});

route.put(
  "/shorten",
  validateBody(schemaShorten),
  async (req: Request, res: Response) => {
    try {
      const { longUrl } = req.body;
      const [resultsService] = await ShortenService.edit(longUrl);
      if (!resultsService)
        return response.error(res, `${longUrl} was not found`, 404);

      const { views, ...results } = resultsService;

      return response.success(res, results, "success update " + longUrl, 200);
    } catch (error) {
      return response.error(res);
    }
  },
);

route.get(
  "/shorten/:code/stats",

  async (req: Request, res: Response) => {
    const { code } = req.params;

    const iscode = validateShortCode(code as string, res);
    if (!iscode) return;

    const resultsService = ShortenService.details(code as string);

    if (!resultsService)
      return response.error(res, `${code} was not found`, 404);

    return response.success(res, resultsService, "Succes get details " + code);
  },
);

export default route;
