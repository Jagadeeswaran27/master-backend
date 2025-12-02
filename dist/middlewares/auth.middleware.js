import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { JwtUtil } from "../utils/jwt.util.js";
export const autheticate = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        throw new AppError("Unauthorized(Token not found)", 401);
    }
    const decodedToken = JwtUtil.verifyToken(token);
    req.user = decodedToken;
    next();
});
//# sourceMappingURL=auth.middleware.js.map