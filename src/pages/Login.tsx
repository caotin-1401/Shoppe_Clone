import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import _ from "lodash";
import { schema, Schema } from "../untils/rules";
import { loginAccount } from "../api/auth.api";
import { isAxiosUnprocessableEntity } from "../untils/untils";
import { ErrorResponseAPI } from "../types/utils.type";
import { useContext } from "react";
import { AppContext } from "./../contexts/context";
import Button from "../components/Button";

type FormData = Pick<Schema, "email" | "password">;
const registerSchema = schema.pick(["email", "password"]);

export default function Login() {
    const { setIsAuthenticated, setProfile } = useContext(AppContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(registerSchema),
    });

    const loginMutation = useMutation({
        mutationFn: (body: Omit<FormData, "confirm_password">) => loginAccount(body),
    });

    const onSubmit = handleSubmit((data) => {
        loginMutation.mutate(data, {
            onSuccess: (data) => {
                setIsAuthenticated(true);
                console.log(data);
                setProfile(data.data.data.user);
                navigate("/");
            },
            onError: (error) => {
                if (isAxiosUnprocessableEntity<ErrorResponseAPI<FormData>>(error)) {
                    const formError = error.response?.data.data;
                    if (formError) {
                        Object.keys(formError).forEach((key) => {
                            setError(key as keyof FormData, {
                                message: formError[key as keyof FormData],
                                type: "Server",
                            });
                        });
                    }
                }
            },
        });
    });
    const value = watch();
    return (
        <div className="bg-orange">
            <div className="container">
                <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
                    <div className="lg:col-span-2 lg:col-start-4">
                        <form
                            className="rounded bg-white p-10 shadow-sm"
                            noValidate
                            onSubmit={onSubmit}>
                            <div className="text-2xl">Đăng nhập</div>
                            <div className="mt-8">
                                <input
                                    {...register("email")}
                                    type="email"
                                    id=""
                                    placeholder="Email"
                                    className="p-3 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm"
                                />
                                <div className="mt-1 text-red-600 min-h-[1rem] text-sm">
                                    {errors.email?.message}
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    {...register("password")}
                                    id=""
                                    placeholder="Password"
                                    className="p-3 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm"
                                />
                                <div className="mt-1 text-red-600 min-h-[1rem] text-sm">
                                    {errors.password?.message}
                                </div>
                            </div>
                            <div className="mt-3">
                                <Button
                                    type="submit"
                                    isLoading={loginMutation.isLoading}
                                    disabled={loginMutation.isLoading}>
                                    {" "}
                                    Đăng nhập
                                </Button>
                            </div>
                            <div className="flex items-center justify-center mt-3">
                                <span className="text-slate-400 mr-3"> Bạn đã có tài khoản </span>
                                <Link className="text-red-400" to="/register">
                                    Đăng ký
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
