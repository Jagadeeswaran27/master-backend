import type { UserDto } from "../dto/user.dto.js";
export declare class JwtUtil {
    private static readonly secret;
    static generateToken(payload: UserDto): string;
    static verifyToken(token: string): UserDto;
    static decodeToken(token: string): UserDto | null;
}
//# sourceMappingURL=jwt.util.d.ts.map