import { AppError } from "../utils/AppError.js";
import logger from "../utils/logger.js";
import { Prisma } from "@prisma/client";
const handlePrismaError = (err) => {
    switch (err.code) {
        case "P2002":
            return new AppError(`Duplicate field value: ${err.meta?.target}`, 409);
        case "P2025":
            return new AppError("Record not found", 404);
        default:
            return new AppError(`Something went wrong: ${err.message}`, 500);
    }
};
export const errorHandler = (err, req, res, next) => {
    let error = err;
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        error = handlePrismaError(err);
    }
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    if (process.env.NODE_ENV === "development") {
        logger.error({ error }, "Development Error Log");
        res.status(error.statusCode).json({
            success: false,
            status: error.status,
            message: error.message,
            stack: error.stack,
            error: error,
        });
    }
    else {
        if (error.isOperational) {
            logger.warn({ error }, `Operational Error: ${error.message}`);
            res.status(error.statusCode).json({
                success: false,
                status: error.status,
                message: error.message,
            });
        }
        else {
            logger.error({ error }, "💥 UNEXPECTED ERROR 💥");
            res.status(500).json({
                success: false,
                status: "error",
                message: "Something went very wrong!",
            });
        }
    }
};
//# sourceMappingURL=error.middleware.js.map