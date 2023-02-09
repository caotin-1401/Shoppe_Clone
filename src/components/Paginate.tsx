import { QueryConfig } from "../pages/ProductList";
import { Link, createSearchParams } from "react-router-dom";
import path from "./../untils/constant";

interface Props {
    queryConfig: QueryConfig;
    pageSize: number;
}

export default function Paginate({ queryConfig, pageSize }: Props) {
    const page = Number(queryConfig.page);
    const renderPagination = () => {
        let dotAfter = false;
        let dotBefore = false;
        const renderDotBefore = (index: number) => {
            if (!dotBefore) {
                dotBefore = true;
                return (
                    <span
                        key={index}
                        className="bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer">
                        ...
                    </span>
                );
            }

            return null;
        };
        const renderDotAfter = (index: number) => {
            if (!dotAfter) {
                dotAfter = true;
                return (
                    <span
                        key={index}
                        className="bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer">
                        ...
                    </span>
                );
            }

            return null;
        };
        /*
        [1] 2 3 ... 19 20
        1 [2] 3 4 ... 19 20
        1 2 [3] 4 5 ... 19 20
        1 2 3 [4] 5 6 ... 19 20
        1 2 3 4 [5] 6 7 ... 19 20
            
            
        1 2 ... 4 5 [6] 7 8 ... 19 20
        1 2 ... 13 14 [15] 16 17 ... 19 20
            
            
        1 2 ... 14 15 [16] 17 18 19 20
        1 2 ... 14 15 16 [17] 18 19 20
        1 2 ... 14 15 16 17 [18] 19 20
        1 2 ... 14 15 16 17 18 [19] 20
        1 2 ... 14 15 16 17 18 19 [20]
         */
        return Array(pageSize)
            .fill(0)
            .map((_, index) => {
                const pageNumber = index + 1;
                if (page <= 5 && page < pageNumber - 2 && pageNumber < pageSize - 2 + 1) {
                    return renderDotAfter(index);
                } else if (page > 5 && page < pageSize - 4) {
                    if (pageNumber < page - 2 && pageNumber > 2) return renderDotBefore(index);
                    else if (pageNumber > page + 2 && pageNumber < pageSize - 2 + 1)
                        return renderDotAfter(index);
                } else if (page >= pageSize - 4 && pageNumber > 2 && pageNumber < page - 2) {
                    return renderDotBefore(index);
                }
                return (
                    <Link
                        to={{
                            pathname: path.home,
                            search: createSearchParams({
                                ...queryConfig,
                                page: pageNumber.toString(),
                            }).toString(),
                        }}
                        key={index}
                        // onClick={() => setPage(pageNumber)}
                        className={
                            pageNumber === page
                                ? "border bg-red-500 text-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer"
                                : "border-transparent bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer"
                        }>
                        {pageNumber}
                    </Link>
                );
            });
    };
    console.log(page);
    console.log(queryConfig);
    return (
        <div className="flex flex-wrap mt-6 justify-center">
            {page == 1 || !page ? (
                <span className="border curson-no-drop bg-white rounded px-3 py-2 shadow-sm mx-2 curson-not-allowed">
                    Prev
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
                    className="border bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer">
                    Prev
                </Link>
            )}

            {renderPagination()}
            {page === pageSize ? (
                <span className="border curson-no-drop bg-white rounded px-3 py-2 shadow-sm mx-2 curson-not-allowed">
                    Next
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
                    className="border bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer">
                    Next
                </Link>
            )}
        </div>
    );
}
