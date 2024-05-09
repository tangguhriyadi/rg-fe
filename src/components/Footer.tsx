import Image from "next/image";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-black w-full px-4 gap-y-4 text-white flex flex-col justify-between items-center md:flex-row md:justify-around py-5">
            <div className="flex gap-x-8 items-center">
                <Image
                    className="h-fit"
                    src="/ig.png"
                    width={22.68}
                    height={22.68}
                    alt="ig"
                />
                <Image
                    className="h-fit"
                    src="/fb.png"
                    width={10.33}
                    height={22.43}
                    alt="fb"
                />
                <Image
                    className="h-fit"
                    src="/twt.png"
                    width={20.02}
                    height={16.23}
                    alt="twt"
                />
            </div>
            <div className="text-[14px] flex flex-col md:flex-row">
                <p className="text-center md:text-left">Terms & Condition</p>
                <p className="mx-5 hidden md:visible">|</p>
                <p className="text-center md:text-left">
                    Copy Right &reg; 2018. All Rights reserved. PT Radya Gita Bahagi
                </p>
            </div>
        </footer>
    );
};

export default Footer;
