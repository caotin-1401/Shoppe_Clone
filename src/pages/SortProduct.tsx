import { QueryConfig } from './ProductList';
import { sortBy, order as orderConstant } from './../constants/product';
import { ProductListConfig } from './../types/product.type';
import { useNavigate } from 'react-router-dom';
import path from './../untils/constant';
import { createSearchParams } from 'react-router-dom';
import { omit } from 'lodash';
import { Link } from 'react-router-dom';
interface Props {
    queryConfig: QueryConfig;
    pageSize: number;
}

export default function SortProduct({ queryConfig, pageSize }: Props) {
    const { sort_by = sortBy.createdAt, order } = queryConfig;
    const navigate = useNavigate();
    const page = Number(queryConfig.page);
    const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
        return sort_by === sortByValue;
    };
    const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
        navigate({
            pathname: path.home,
            search: createSearchParams(
                omit(
                    {
                        ...queryConfig,
                        sort_by: sortByValue,
                    },
                    ['order']
                )
            ).toString(),
        });
    };
    const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
        navigate({
            pathname: path.home,
            search: createSearchParams({
                ...queryConfig,
                sort_by: sortBy.price,
                order: orderValue,
            }).toString(),
        });
    };
    return (
        <div className="bg-gray-300/40 py-4 px-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center flex-wrap gap-2">
                    <div>Sắp xếp theo</div>
                    <button
                        onClick={() => handleSort(sortBy.view)}
                        className={
                            isActiveSortBy(sortBy.view)
                                ? 'h-8 px-4 text-center text-sm capitalize bg-orange text-white hover:bg-orange/80'
                                : 'h-8 px-4 text-center text-sm capitalize bg-white text-black hover:bg-slate-100'
                        }>
                        {' '}
                        Phổ biến
                    </button>
                    <button
                        onClick={() => handleSort(sortBy.createdAt)}
                        className={
                            isActiveSortBy(sortBy.createdAt)
                                ? 'h-8 px-4 text-center text-sm capitalize bg-orange text-white hover:bg-orange/80'
                                : 'h-8 px-4 text-center text-sm capitalize bg-white text-black hover:bg-slate-100'
                        }>
                        Mới nhất
                    </button>
                    <button
                        onClick={() => handleSort(sortBy.sold)}
                        className={
                            isActiveSortBy(sortBy.sold)
                                ? 'h-8 px-4 text-center text-sm capitalize bg-orange text-white hover:bg-orange/80'
                                : 'h-8 px-4 text-center text-sm capitalize bg-white text-black hover:bg-slate-100'
                        }>
                        Bán chạy
                    </button>
                    <select
                        onChange={(event) =>
                            handlePriceOrder(
                                event.target.value as Exclude<ProductListConfig['order'], undefined>
                            )
                        }
                        value={order || ''}
                        className={
                            isActiveSortBy(sortBy.price)
                                ? 'h-8  px-4 text-left text-sm capitalize  outline-none bg-orange text-white hover:bg-orange/80'
                                : 'h-8  px-4 text-left text-sm capitalize  outline-none bg-white text-black hover:bg-slate-100'
                        }>
                        <option value="" disabled className="bg-white text-black">
                            Giá
                        </option>
                        <option className=" h-8 bg-white text-black" value={orderConstant.asc}>
                            Giá: Thấp đến cao
                        </option>
                        <option className="bg-white text-black" value={orderConstant.desc}>
                            Giá : Cao đến thấp
                        </option>
                    </select>
                </div>
                <div className="flex items-center">
                    <div>
                        <span className="text-orange">{page}</span>
                        <span>/{pageSize}</span>
                    </div>
                    <div className="ml-2 flex">
                        {page === 1 ? (
                            <span className="flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-3 w-3">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 19.5L8.25 12l7.5-7.5"
                                    />
                                </svg>
                            </span>
                        ) : (
                            <Link
                                to={{
                                    pathname: path.home,
                                    search: createSearchParams({
                                        ...queryConfig,
                                        page: (page - 1).toString(),
                                    }).toString(),
                                }}
                                className="flex h-8 w-9  items-center justify-center rounded-tl-sm rounded-bl-sm bg-white  shadow hover:bg-slate-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-3 w-3">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 19.5L8.25 12l7.5-7.5"
                                    />
                                </svg>
                            </Link>
                        )}
                        {page === pageSize ? (
                            <span className="flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-3 w-3">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </span>
                        ) : (
                            <Link
                                to={{
                                    pathname: path.home,
                                    search: createSearchParams({
                                        ...queryConfig,
                                        page: (page + 1).toString(),
                                    }).toString(),
                                }}
                                className="flex h-8 w-9  items-center justify-center rounded-tl-sm rounded-bl-sm bg-white  shadow hover:bg-slate-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-3 w-3">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
