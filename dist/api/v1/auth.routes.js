import { Router } from "express";
import { createUser, getUserDetails, loginUser, } from "../../controllers/auth.controller.js";
import { validateRequest } from "../../middlewares/validation.middleware.js";
import { loginSchema, signupSchema } from "../../validators/auth.validator.js";
import { authRateLimit } from "../../middlewares/rateLimit.middleware.js";
import { autheticate } from "../../middlewares/auth.middleware.js";
const authRouter = Router();
authRouter.use(authRateLimit);
authRouter.post("/signup", validateRequest(signupSchema), createUser);
authRouter.post("/login", validateRequest(loginSchema), loginUser);
authRouter.get("/me", autheticate, getUserDetails);
export default authRouter;
//# sourceMappingURL=auth.routes.js.map