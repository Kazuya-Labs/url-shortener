import type { Response } from "express";

export const response = {
  error: (res: Response, message = "internal server error", status = 500) => {
    return res.status(status).json({
      success: false,
      message,
    });
  },

  success: (res: Response, data: any, message = "succes", status = 200) => {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  },
};
