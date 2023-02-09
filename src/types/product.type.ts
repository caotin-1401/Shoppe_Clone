export interface Product {
    _id: string;
    images: string[];
    price: number;
    rating: number;
    price_before_discount: number;
    quantity: number;
    sold: number;
    view: number;
    name: string;
    description: string;
    category: {
        _id: string;
        name: string;
    };
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProductList {
    products: Product[];
    pagination: {
        page: number;
        limit: number;
        page_size: number;
    };
}

export interface ProductListConfig {
    page?: number | string | undefined;
    limit?: number | string | undefined;
    sort_by?: 'createdAt' | 'view' | 'sold' | 'price' | undefined;
    order?: 'asc' | 'desc' | undefined;
    exclude?: string | undefined;
    rating_filter?: number | string | undefined;
    price_max?: number | string | undefined;
    price_min?: number | string | undefined;
    name?: string | undefined;
    category?: string | undefined;
}
