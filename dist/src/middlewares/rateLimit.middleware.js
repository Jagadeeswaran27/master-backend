import rateLimit from "express-rate-limit";
export const globalRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});
export const authRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many authentication attempts, please try again later.",
    skipSuccessfulRequests: true,
});
//# sourceMappingURL=rateLimit.middleware.js.map