import type { NextFunction, Request, Response } from "express";
import z from "zod";
import { AppError } from "../utils/AppError.js";

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError(
          `Validation error: ${error.issues.map((e) => e.message).join(", ")}`,
          400
        );
      }
      next(error);
    }
  };
};
