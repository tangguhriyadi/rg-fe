import React from "react";
import { getProductDetail } from "../../../server-action/product";
import { Product } from "../../../types/product";
import Image from "next/image";
import Ratings from "../../../components/Ratings";
import Link from "next/link";
import { Metadata } from "next";
import WishListButton from "../../../components/WishListButton";

interface Props {
    params: {
        productId: string;
    };
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const { params } = props;

    const data = await getProductDetail(params.productId);

    const product = data.data as Product;

    return {
        title: `${product?.attributes.name}`,
        description: product?.attributes.info,
    };
};

const ProductDetail: React.FC<Props> = async (props) => {
    const { params } = props;

    const data = await getProductDetail(params.productId);
    const product = data.data as Product;

    const renderLabel = () => {
        const isBestSeller =
            product.attributes.rating >= 4 &&
            product.attributes.numOfReviews >= 25;
        if (Boolean(product.attributes.isNew)) {
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

        if (product.attributes.isNew && isBestSeller) {
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
    };

    const renderStock = () => {
        if (product.attributes.stock === 0) {
            return (
                <p className="text-[#E64580] text-[14px] font-semibold">
                    Sold Out
                </p>
            );
        }

        if (product.attributes.stock < 5) {
            return (
                <p className="text-[#E64580] text-[14px] font-semibold group-hover:text-white">
                    Stock &lt; 5
                </p>
            );
        }

        return (
            <p className="text-[#006A4E] text-[14px] font-semibold group-hover:text-white">
                In Stock
            </p>
        );
    };
    return (
        <div>
            <section className="px-8 py-4">
                <p className="mb-4">
                    <Link href="/">List product</Link> &gt;{" "}
                    {product.attributes.name}
                </p>
                <div className="flex flex-col lg:flex-row justify-center gap-x-12">
                    <div className="w-full max-w-[550px] h-[550px] relative flex items-center justify-center">
                        <Image
                            src={product.attributes.images[0]}
                            width={414}
                            height={550}
                            alt={product.attributes.name}
                        />
                        {renderLabel()}
                    </div>
                    <div className="flex flex-col w-full max-w-[412px]">
                        <h2 className="text-[24px] font-bold mb-2">
                            {product.attributes.name}
                        </h2>
                        <div className="flex w-full gap-x-3 items-center mb-4">
                            <Ratings
                                isDetail
                                rating={product.attributes.rating}
                            />
                            <p className="text-[12px]">
                                {product.attributes.numOfReviews} reviews
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-x-3 mb-6">
                            <Image
                                src="/poin.png"
                                width={20}
                                height={20}
                                alt="poin"
                            />
                            <p className="text-[24px] text-[#74B71B] font-bold">
                                {product.attributes.points} poins
                            </p>
                            <div>{renderStock()}</div>
                        </div>
                        <div
                            className="mb-4"
                            dangerouslySetInnerHTML={{
                                __html:
                                    product.attributes.info ??
                                    "<p>Content Not Available</p>",
                            }}
                        />
                        <p className="text-[#838EAB] text-sm mb-4">Jumlah</p>
                        <div className="flex  font-semibold">
                            <div className="px-3 py-1 rounded-sm bg-gray-300 cursor-pointer text-[18px]">
                                -
                            </div>
                            <div className="px-3 py-1 rounded-sm text-[18px]">
                                1
                            </div>
                            <div className="px-3 py-1 rounded-sm bg-gray-300 cursor-pointer text-[18px]">
                                +
                            </div>
                        </div>
                        <div className="flex mt-10 gap-x-3">
                            <WishListButton attribute={product.attributes} isDetail/>
                            <div className="w-[150px] h-[45px] rounded-full bg-[#006A4E] text-white flex justify-center items-center cursor-pointer">
                                <p className="text-[14px]">Redeem</p>
                            </div>
                            <div className="w-[150px] h-[45px] rounded-full border border-[#74B71B] text-[#74B71B] flex justify-center items-center cursor-pointer">
                                <p className="text-[14px]">Redeem</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-10 px-8">
                <h3 className="text-[16px] text-[#74B71B]">Info Produk</h3>
                <div className="h-[3px] bg-[#74B71B] w-[153px] mt-3 mb-12"></div>
                <h3 className="text-2xl text-[#006A4E] mb-10">Rincian</h3>
                <div
                    className="mb-10"
                    dangerouslySetInnerHTML={{
                        __html:
                            product.attributes.description ??
                            "<p>Content Not Available</p>",
                    }}
                />
            </section>
        </div>
    );
};

export default ProductDetail;
