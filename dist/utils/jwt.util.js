import jwt from "jsonwebtoken";
import { config } from "../config/env.config.js";
import { AppError } from "./AppError.js";
export class JwtUtil {
    static secret = config.jwt.secret;
    static generateToken(payload) {
        return jwt.sign(payload, this.secret);
    }
    static verifyToken(token) {
        try {
            return jwt.verify(token, this.secret);
        }
        catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new AppError("Token has expired", 401);
            }
            if (error instanceof jwt.JsonWebTokenError) {
                throw new AppError("Invalid token", 401);
            }
            throw new AppError("Token verification failed", 401);
        }
    }
    static decodeToken(token) {
        const decoded = jwt.decode(token);
        return decoded;
    }
}
//# sourceMappingURL=jwt.util.js.map