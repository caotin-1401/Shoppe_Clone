import * as yup from "yup";

export const schema = yup.object({
    email: yup.string().required("Email là bắt buộc").email("Email không đúng định dạng"),
    password: yup
        .string()
        .required("Mật khẩu là bắt buộc")
        .min(8, "Độ dài mk từ  8 đến 16 ký tự ")
        .max(15, "Độ dài mk từ  8 đến 16 ký tự "),
    confirm_password: yup
        .string()
        .required("Nhập lại mật khẩu là bắt buộc")
        .min(8, "Độ dài mk từ  8 đến 16 ký tự ")
        .max(15, "Độ dài mk từ  8 đến 16 ký tự ")
        .oneOf([yup.ref("password")], "Nhap lai password khong khop"),
});

export type Schema = yup.InferType<typeof schema>;
// import type { RegisterOptions, UseFormGetValues } from "react-hook-form";

// type Rules = { [key in "email" | "password" | "confirm_password"]?: RegisterOptions };

// export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
//     email: {
//         required: {
//             value: true,
//             message: "Email là bắt buộc",
//         },
//         pattern: {
//             value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
//             message: "Email không đúng định dạng",
//         },
//         // maxLength: {
//         //     value: 160,
//         //     message: "Độ dài email từ  5 đến 160 ký tự ",
//         // },
//         // minLength: {
//         //     value: 5,
//         //     message: "Độ dài email từ  5 đến 160 ký tự ",
//         // },
//     },
//     password: {
//         required: {
//             value: true,
//             message: "Mật khẩu là bắt buộc",
//         },
//         maxLength: {
//             value: 16,
//             message: "Độ dài email từ  8 đến 16 ký tự ",
//         },
//         minLength: {
//             value: 8,
//             message: "Độ dài email từ  8 đến 16 ký tự ",
//         },
//     },
//     comfirm_password: {
//         required: {
//             value: true,
//             message: "Nhập lại mật khẩu là bắt buộc",
//         },
//         maxLength: {
//             value: 16,
//             message: "Độ dài email từ  8 đến 16 ký tự ",
//         },
//         minLength: {
//             value: 8,
//             message: "Độ dài email từ  8 đến 16 ký tự ",
//         },
//         validate:
//             typeof getValues === "function"
//                 ? (value) => value === getValues("password") || "Password inva"
//                 : undefined,
//     },
// });
