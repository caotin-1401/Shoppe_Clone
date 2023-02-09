import axios, { AxiosInstance, HttpStatusCode, AxiosError } from "axios";
import { toast } from "react-toastify";
import { AuthResponse } from "../types/auth.type";
import { clearLS, setAccessTokenToLS, getAccessTokenFromLS, setProfileToLS } from "./auth";

class Http {
    instance: AxiosInstance;
    private accessToken: string;
    constructor() {
        this.accessToken = getAccessTokenFromLS();
        this.instance = axios.create({
            baseURL: "https://api-ecom.duthanhduoc.com/",
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
            },
        });
        this.instance.interceptors.response.use(
            (config) => {
                if (this.accessToken) {
                    config.headers.authorization = this.accessToken;
                    return config;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        this.instance.interceptors.response.use(
            (response) => {
                const { url } = response.config;

                if (url === "/login" || url === "/register") {
                    const data = response.data as AuthResponse;
                    this.accessToken = data.data.access_token;
                    setAccessTokenToLS(this.accessToken);
                    setProfileToLS(data.data.user);
                } else if (url === "/logout") {
                    this.accessToken = "";
                    clearLS();
                }
                return response;
            },
            function (error: AxiosError) {
                if (error.response?.status === HttpStatusCode.UnprocessableEntity) {
                    const data: any | undefined = error.response?.data;
                    const message = data?.message || error.message;
                    toast.error(message);
                }
                if (error.response?.status === 401) {
                    clearLS();
                }

                return Promise.reject(error);
            }
        );
    }
}

const http = new Http().instance;
export default http;
