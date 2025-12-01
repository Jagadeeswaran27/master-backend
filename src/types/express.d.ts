import { JwtPayload } from "jsonwebtoken";
import type { UserDto } from "../dto/user.dto.ts";

declare global {
  namespace Express {
    interface Request {
      user?: UserDto;
    }
  }
}

export {};
