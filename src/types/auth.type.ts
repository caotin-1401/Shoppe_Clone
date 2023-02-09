import { SuccessResponseAPI } from "./utils.type";
import { User } from "./user.type";

export type AuthResponse = SuccessResponseAPI<{
    access_token: string;
    expires: number;
    user: User;
    refresh_token: string;
    expires_refresh_token: number;
}>;

// const auth: AuthResponse = {
//     message: "asd",
//     data: {},
// };
