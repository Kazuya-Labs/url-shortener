import type { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validateBody =
  (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const body = req.body || {};
    const { error, value } = schema.validate(body, {
      abortEarly: true,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        errors: errors,
      });
    }
    req.body = value;
    next();
  };
