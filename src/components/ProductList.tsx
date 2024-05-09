"use client";

import React, { useEffect, useRef } from "react";
import Dropdown from "./Dropdown";
import ProductCard from "./ProductCard";
import { useProductList } from "../hooks/useProduct";
import { useSearchParams } from "next/navigation";

interface ProductListProps extends React.ComponentPropsWithRef<"div"> {}

const ProductList: React.FC<ProductListProps> = (props) => {
    const { ...restProps } = props;

    const { fetchData, items, isLoading, fetchInitial } = useProductList();
    const observerTarget = useRef<HTMLDivElement>(null);

    const searchParams = useSearchParams();

    useEffect(() => {
        fetchInitial();
    }, [searchParams.size]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    fetchData();
                }
            },
            { threshold: 1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [observerTarget, isLoading, fetchData]);

    return (
        <section {...restProps}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <h2 className="text-[17px] font-bold">Product List</h2>
                <div className="flex justify-start md:justify-end lg:justify-between items-center gap-x-[14px]">
                    <p className="font-normal text-[12px]">Urutkan</p>
                    <Dropdown />
                </div>
            </div>
            <hr className="border border-y-1 mt-4 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 relative">
                {items.map((item, index) => (
                    <ProductCard key={index} attribute={item.attributes} />
                ))}
            </div>
            {items && items.length > 0 && !isLoading && (
                <div ref={observerTarget}></div>
            )}
            {isLoading && (
                <div className="w-full flex justify-center py-6">
                    <div className="loader w-24 h-24"></div>
                </div>
            )}
        </section>
    );
};

export default ProductList;
