import Filter from './Filter';
import SortProduct from './SortProduct';
import Product from './../components/Product';
import './style.css';
import { useQuery } from '@tanstack/react-query';
import productApi from './../api/product.api';
import Paginate from '../components/Paginate';
import { ProductListConfig } from './../types/product.type';
import useQueryConfig from '../hooks/useQueryConfig';

export type QueryConfig = {
    [key in keyof ProductListConfig]: string;
};

export default function ProductList() {
    const queryConfig = useQueryConfig();
    const { data } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => {
            return productApi.getProducts(queryConfig as ProductListConfig);
        },
    });
    return (
        <div className="bg-gray-200 py-6">
            <div className="container">
                {data && (
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-3">
                            <Filter />
                        </div>
                        <div className="col-span-9">
                            <SortProduct
                                queryConfig={queryConfig}
                                pageSize={data.data.data.pagination.page_size}
                            />
                            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {data.data.data.products.map((product, index) => (
                                    <div className="product_container col-span-1" key={product._id}>
                                        <Product product={product} />
                                    </div>
                                ))}
                            </div>
                            <Paginate
                                queryConfig={queryConfig}
                                pageSize={data.data.data.pagination.page_size}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
