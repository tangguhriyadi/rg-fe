import React, { useCallback, useMemo, useRef } from "react";
import { Attribute } from "../types/product";
import Image from "next/image";
import Ratings from "./Ratings";
import { cn } from "../utils/cn";
import { useRouter } from "next/navigation";
import WishListButton from "./WishListButton";

interface ProductCardProps {
    attribute: Attribute;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
    const { attribute } = props;

    const router = useRouter();

    const isSoldOut = useMemo(() => {
        if (attribute.stock === 0) return true;
        return false;
    }, [attribute.stock]);

    const renderStock = useCallback<() => React.ReactNode>(() => {
        if (isSoldOut) {
            return (
                <p className="text-[#E64580] text-[12px] font-semibold">
                    Sold Out
                </p>
            );
        }

        if (attribute.stock < 5) {
            return (
                <p className="text-[#E64580] text-[12px] font-semibold group-hover:text-white">
                    Stock &lt; 5
                </p>
            );
        }

        return (
            <p className="text-[#79B625] text-[12px] font-semibold group-hover:text-white">
                In Stock
            </p>
        );
    }, [attribute.stock, isSoldOut]);

    const renderLabel = useCallback(() => {
        const isBestSeller =
            attribute.rating >= 4 && attribute.numOfReviews >= 25;
        if (Boolean(attribute.isNew)) {
            return (
                <Image
                    className="absolute top-0 right-0 z-50"
                    src="/label-new.png"
                    width={76.47}
                    height={76.57}
                    alt="label-new"
                />
            );
        }

        if (attribute.isNew && isBestSeller) {
            return (
                <Image
                    className="absolute top-0 right-0 z-50"
                    src="/label-hot-item.png"
                    width={76.47}
                    height={76.57}
                    alt="label-new"
                />
            );
        }
        if (isBestSeller) {
            return (
                <Image
                    className="absolute top-0 right-0 z-50"
                    src="/label-best-seller.png"
                    width={76.47}
                    height={76.57}
                    alt="label-new"
                />
            );
        }
    }, [attribute]);

    return (
        <div className="py-6 px-8 flex flex-col border border-[#D8D8D8] rounded-md relative group">
            <div className="mb-4 ml-2">{renderStock()}</div>
            <div className="flex justify-center h-full">
                <Image
                    src={attribute.images[0]}
                    alt={attribute.name}
                    height={264}
                    width={200}
                />
            </div>
            <div className="mt-4">
                <h3 className="text-[16px]">{attribute.name}</h3>
            </div>
            <div className="flex justify-between mt-2 items-end">
                <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-x-2">
                        <Image
                            src="/poin.png"
                            width={10.5}
                            height={10.5}
                            alt="poin"
                        />
                        <p className="text-[16px] text-[#74B71B]">
                            {attribute.points} poins
                        </p>
                    </div>
                    <div className="flex w-full gap-x-3 items-center">
                        <Ratings rating={attribute.rating} />
                        <p className="text-[12px]">
                            {attribute.numOfReviews} reviews
                        </p>
                    </div>
                </div>
            </div>
            {renderLabel()}
            {!isSoldOut ? (
                <div className="py-6 px-8 flex flex-col justify-between absolute w-full h-full opacity-0 left-0 top-0 bg-gradient-to-b from-[#74B71B] to-[#649C1A] group-hover:opacity-95 transition-all duration-200">
                    <div className="ml-2">{renderStock()}</div>
                    <div className="h-[100px] flex flex-col justify-end">
                        <h3 className="text-white font-medium text-center">
                            {attribute.name}
                        </h3>
                    </div>
                    <div
                        className="flex justify-center items-center h-[35px] full w-full border border-white rounded-full cursor-pointer"
                        onClick={() => router.push(`/product/${attribute.id}`)}
                    >
                        <p className="text-white text-[12px] ">View detail</p>
                    </div>
                    <div className="flex justify-end">
                        <WishListButton attribute={attribute} />
                    </div>
                </div>
            ) : (
                <div
                    className="absolute w-full h-full left-0 top-0 opacity-[73%] bg-[#E1E8EE] cursor-pointer"
                    onClick={() => router.push(`/product/${attribute.id}`)}
                ></div>
            )}
            <div
                className={cn(
                    "absolute bottom-[24px] right-[32px] group-hover:opacity-100 z-50"
                )}
            >
                <WishListButton attribute={attribute} />
            </div>
        </div>
    );
};

export default ProductCard;
