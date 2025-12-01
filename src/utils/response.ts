import type { Response } from "express";

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  data: T,
  message: string = "Success"
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
