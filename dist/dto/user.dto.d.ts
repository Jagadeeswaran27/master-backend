import type { User } from "@prisma/client";
export interface UserDto {
    id: string;
    name: string;
    email: string;
}
export declare const toUserDto: (user: User) => UserDto;
//# sourceMappingURL=user.dto.d.ts.map