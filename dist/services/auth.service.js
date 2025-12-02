import bcrypt from "bcrypt";
import prisma from "../utils/prisma.js";
import { AppError } from "../utils/AppError.js";
import { JwtUtil } from "../utils/jwt.util.js";
export const createUserService = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });
};
export const loginUserService = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new AppError("User not found", 404);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError("Invalid password", 401);
    }
    return user;
};
export const createJwtTokenService = async (user) => {
    return JwtUtil.generateToken(user);
};
//# sourceMappingURL=auth.service.js.map