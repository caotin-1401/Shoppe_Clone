import http from "../untils/http";
import { AuthResponse } from "../types/auth.type";

export const registerAccount = (body: { email: string; password: string }) =>
    http.post<AuthResponse>("/register", body);

export const loginAccount = (body: { email: string; password: string }) =>
    http.post<AuthResponse>("/login", body);

export const logout = () => http.post<AuthResponse>("/logout");
