import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
    return (
        <header className="flex justify-center lg:justify-start">
            <Link href="/">
                <Image
                    src="/logo-dummy.png"
                    alt="company logo"
                    priority
                    width={161}
                    height={57}
                />
            </Link>
        </header>
    );
};

export default Header;
