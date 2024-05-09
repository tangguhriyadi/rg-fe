"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Dropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [currentFilter, setCurrentFilter] = useState<string>("Terbaru");

    const componentRef = useRef<HTMLDivElement>(null);

    const searchParams = useSearchParams();

    const pathname = usePathname();

    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                componentRef.current &&
                !componentRef.current.contains(event.target as Node)
            ) {
                // Handle click outside logic here
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleChangeFilter = useCallback(
        (filter: string) => {
            setIsOpen(false);
            setCurrentFilter(filter);
            const params = new URLSearchParams(searchParams.toString());
            params.set("sort", filter.toLowerCase());
            router.push(pathname + "?" + params.toString());
        },
        [router, pathname, searchParams]
    );

    useEffect(() => {
        const params = searchParams.get("sort");

        if (params) {
            const string = params?.charAt(0).toUpperCase() + params?.slice(1);
            setCurrentFilter(string);
        }
    }, [searchParams]);

    return (
        <div
            className={cn(
                "relative py-2 text-center rounded-full min-w-[169px] border z-10",
                isOpen && "border-b-0"
            )}
            ref={componentRef}
        >
            <div
                className="cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <p className="text-[12px] -ml-2">{currentFilter}</p>
                <Image
                    className="absolute top-[40%] right-5"
                    src="/polygon.png"
                    alt="polygon"
                    width={10}
                    height={8}
                />
            </div>
            <div
                className={cn(
                    "absolute flex flex-col border-x border-b w-full pt-2 rounded-sm bg-white",
                    !isOpen && "hidden"
                )}
            >
                <div
                    className="border-b cursor-pointer text-[12px] py-2 hover:bg-[#74B71B] hover:text-white transition-all duration-300"
                    onClick={() => handleChangeFilter("Terbaru")}
                >
                    <p>Terbaru</p>
                </div>
                <div
                    className="cursor-pointer text-[12px] py-2 hover:bg-[#74B71B] hover:text-white transition-all duration-300"
                    onClick={() => handleChangeFilter("Ulasan")}
                >
                    <p>Ulasan</p>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
