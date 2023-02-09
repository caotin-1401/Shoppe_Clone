import { SuccessResponseAPI } from "../types/utils.type";
import http from "../untils/http";
import { ProductListConfig, ProductList, Product } from "./../types/product.type";

const URL = "products";

const productApi = {
    getProducts(params: ProductListConfig) {
        return http.get<SuccessResponseAPI<ProductList>>(URL, { params });
    },
    getProductDetail(id: string) {
        return http.get<SuccessResponseAPI<Product>>(`${URL}/${id}`);
    },
};

export default productApi;
