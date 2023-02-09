import { Link } from "react-router-dom";
import { Product as ProductType } from "./../types/product.type";
import { formatCurrency, formatNumberToSocialStyle } from "./../untils/untils";
import ProductRating from "./ProductRating";

interface Props {
    product: ProductType;
}

export default function Product({ product }: Props) {
    return (
        <Link to="">
            <div className="overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md">
                <div className="relative w-full pt-[100%] border-solid border-b border-gray-300">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="absolute top-0 left-0 h-full w-full bg-white object-cover"
                    />
                </div>

                <div className="overflow-hidden p-2">
                    {/* <div className="overflow-hidden min-h-[2rem] text-xs line-clamp-2"> */}
                    <div className="test text-sm  min-h-[2rem]">{product.name}</div>
                    <div className="mt-5 mb-5 flex items-center">
                        <div className="max-w-[50%] truncate text-gray-500 line-through">
                            <span className="text-xs">₫</span>
                            <span className="text-sm">
                                {formatCurrency(product.price_before_discount)}
                            </span>
                        </div>
                        <div className="ml-1 truncate text-orange">
                            <span className="text-xs">₫</span>
                            <span className="text-sm">{formatCurrency(product.price)}</span>
                        </div>
                    </div>
                    <div className="mt-3 flex items-center justify-start">
                        <div className="mr-5 flex items-center ">
                            <ProductRating rating={product.rating} />
                        </div>
                        <div className="text-[#bdbdd2]">
                            <span className="ml-1 text-xs">Đã bán</span>
                            <span className="ml-1 text-xs">
                                {formatNumberToSocialStyle(product.sold)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
