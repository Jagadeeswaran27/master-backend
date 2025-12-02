import z from "zod";
import { AppError } from "../utils/AppError.js";
export const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                throw new AppError(`Validation error: ${error.issues.map((e) => e.message).join(", ")}`, 400);
            }
            next(error);
        }
    };
};
//# sourceMappingURL=validation.middleware.js.map