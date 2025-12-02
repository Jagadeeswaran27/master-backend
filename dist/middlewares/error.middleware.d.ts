import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
export declare const errorHandler: (err: AppError, req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=error.middleware.d.ts.map