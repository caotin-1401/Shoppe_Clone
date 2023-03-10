import axios, { AxiosError, HttpStatusCode } from "axios";

export function isAxiosError(error: unknown): error is AxiosError {
    return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntity<FormError>(
    error: unknown
): error is AxiosError<FormError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
}

export function formatCurrency(currency: number) {
    return new Intl.NumberFormat("de-DE").format(currency);
}

export function formatNumberToSocialStyle(value: number) {
    return new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1,
    })
        .format(value)
        .replace(".", ",")
        .toLowerCase();
}

export const rateSale = (original: number, sale: number) =>
    Math.round(((original - sale) / original) * 100) + "%";
