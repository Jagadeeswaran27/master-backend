import { createJwtTokenService, createUserService, loginUserService, } from "../services/auth.service.js";
import logger from "../utils/logger.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/response.js";
import { toUserDto } from "../dto/user.dto.js";
import { AppError } from "../utils/AppError.js";
export const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    logger.info({ name, email }, "Creating user with the data");
    const user = await createUserService(name, email, password);
    const userDto = toUserDto(user);
    logger.info({ userDto }, "User created successfully");
    sendResponse(res, 201, userDto, "User Created Successfully");
});
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    logger.info({ email }, "Logging in with the data");
    const user = await loginUserService(email, password);
    const userDto = toUserDto(user);
    const token = await createJwtTokenService(userDto);
    logger.info({ userDto, token }, "User logged in successfully");
    sendResponse(res, 200, { user: userDto, token }, "User Logged In Successfully");
});
export const getUserDetails = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new AppError("User Not Found", 404);
    }
    logger.info(user, "User Details");
    sendResponse(res, 200, user, "User Details Fetched Successfully");
});
//# sourceMappingURL=auth.controller.js.map