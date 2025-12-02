export const config = {
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    },
};
if (!config.jwt.secret) {
    throw new Error("JWT_SECRET must be defined in environment variables");
}
//# sourceMappingURL=env.config.js.map