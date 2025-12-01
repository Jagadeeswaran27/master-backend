import jwt from "jsonwebtoken";

import { config } from "../config/env.config.js";
import { AppError } from "./AppError.js";
import type { UserDto } from "../dto/user.dto.js";

export class JwtUtil {
  private static readonly secret = config.jwt.secret;

  static generateToken(payload: UserDto): string {
    return jwt.sign(payload, this.secret);
  }

  static verifyToken(token: string): UserDto {
    try {
      return jwt.verify(token, this.secret) as UserDto;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppError("Token has expired", 401);
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppError("Invalid token", 401);
      }
      throw new AppError("Token verification failed", 401);
    }
  }

  static decodeToken(token: string): UserDto | null {
    const decoded = jwt.decode(token);
    return decoded as UserDto | null;
  }
}
