"use client";

import React, { useMemo, useState } from "react";
import { Attribute } from "../types/product";
import { useWishList } from "../hooks/useProduct";
import Image from "next/image";

interface Props extends React.ComponentPropsWithRef<"img"> {
    attribute: Attribute;
    isDetail?: boolean;
}

const WishListButton: React.FC<Props> = (props) => {
    const { attribute, isDetail, width, height, onClick, ...restProps } = props;

    const { addWishList, isLoading } = useWishList();

    const [isWishList, setIsWishList] = useState<boolean>(false);

    const buttonWidth = useMemo<number>(() => {
        if (isDetail) return 70;
        return 54;
    }, [isDetail]);

    const buttonHeught = useMemo<number>(() => {
        if (isDetail) return 45;
        return 32;
    }, [isDetail]);

    if (isLoading) {
        return (
            <div className="w-[54px] h-[32px] flex justify-center items-center">
                <div className="loader w-8 h-8 translate-x-10"></div>
            </div>
        );
    }

    if (isWishList) {
        return (
            <Image
                src="/love-2.png"
                width={buttonWidth}
                height={buttonHeught}
                alt="wishlist"
            />
        );
    }

    return (
        <Image
            className="cursor-pointer"
            src="/love-1.png"
            width={buttonWidth}
            height={buttonHeught}
            alt="wishlist"
            onClick={(e) => {
                if (onClick) {
                    onClick(e);
                }
                addWishList(attribute.id).then(() => setIsWishList(true));
            }}
            {...restProps}
        />
    );
};

export default WishListButton;
