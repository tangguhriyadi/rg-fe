import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { headers } from "next/headers";
import Footer from "../components/Footer";

const raleway = Raleway({ subsets: ["latin"] });

export const generateMetadata = async (): Promise<Metadata> => {
    const host = headers().get("x-forwarded-host");

    return {
        metadataBase: new URL(`https://${host}`),
        title: {
            default:
                "SmartPlace | Toko Online jual beli gadget terbaik di Indonesia",
            template: `%s | SmartPlace`,
        },
        description:
            "SmartPlace Menyediakan layanan jual beli gadget terbaru dengan kualitas terbaik dan disertai dengan garansi yang tidak ada habisnya. Buruan beli sebelum kehabisan !",
    };
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={raleway.className}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
