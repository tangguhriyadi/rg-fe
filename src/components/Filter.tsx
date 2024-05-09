"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";

interface FilterProps extends React.ComponentPropsWithRef<"div"> {}

const Filter: React.FC<FilterProps> = (props) => {
    const { ...restProps } = props;
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const onChangeRating = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const params = new URLSearchParams(searchParams.toString());
            if (e.target.checked === true) {
                params.set("rating4", "true");
                router.push(pathname + "?" + params.toString());
            } else {
                params.delete("rating4");
                router.push(pathname + "?" + params.toString());
            }
        },
        [router, pathname, searchParams]
    );

    const onChangeStock = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const params = new URLSearchParams(searchParams.toString());

            if (e.target.checked === true) {
                params.set("stock", "true");
                router.push(pathname + "?" + params.toString());
            } else {
                params.delete("stock");
                router.push(pathname + "?" + params.toString());
            }
        },
        [router, pathname, searchParams]
    );

    return (
        <aside {...restProps}>
            <h2 className="text-[17px] font-bold">Filter</h2>
            <hr className="border border-y-1 mt-4 lg:mt-[27px] mb-4" />
            <div className="flex flex-col gap-y-6 py-6 px-4 border boder=[#D8D8D8] rounded-md">
                <div className="flex justify-between">
                    <h3 className="text-[15px]">Rating 4 ke atas</h3>
                    <input
                        className="cursor-pointer"
                        type="checkbox"
                        onChange={onChangeRating}
                    />
                </div>
                <div className="flex justify-between">
                    <h3 className="text-[15px]">Stok Tersedia</h3>
                    <input
                        className="cursor-pointer"
                        type="checkbox"
                        onChange={onChangeStock}
                    />
                </div>
            </div>
        </aside>
    );
};

export default Filter;
