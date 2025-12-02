import type { UserDto } from "../dto/user.dto.js";
export declare const createUserService: (name: string, email: string, password: string) => Promise<{
    name: string;
    id: string;
    email: string;
    password: string;
}>;
export declare const loginUserService: (email: string, password: string) => Promise<{
    name: string;
    id: string;
    email: string;
    password: string;
}>;
export declare const createJwtTokenService: (user: UserDto) => Promise<string>;
//# sourceMappingURL=auth.service.d.ts.map