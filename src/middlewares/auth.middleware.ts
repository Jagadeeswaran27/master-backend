import type { NextFunction, Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import type { UserDto } from "../dto/user.dto.js";
import { JwtUtil } from "../utils/jwt.util.js";

export const autheticate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError("Unauthorized(Token not found)", 401);
    }

    const decodedToken = JwtUtil.verifyToken(token);

    req.user = decodedToken as UserDto;

    next();
  }
);
