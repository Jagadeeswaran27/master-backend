import type { User } from "@prisma/client";

export interface UserDto {
  id: string;
  name: string;
  email: string;
}

export const toUserDto = (user: User): UserDto => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};
