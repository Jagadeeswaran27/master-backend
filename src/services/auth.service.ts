import bcrypt from "bcrypt";

import prisma from "../utils/prisma.js";
import { AppError } from "../utils/AppError.js";
import type { UserDto } from "../dto/user.dto.js";
import { JwtUtil } from "../utils/jwt.util.js";

export const createUserService = async (
  name: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
};

export const loginUserService = async (email: string, password: string) => {
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

export const createJwtTokenService = async (user: UserDto) => {
  return JwtUtil.generateToken(user);
};
