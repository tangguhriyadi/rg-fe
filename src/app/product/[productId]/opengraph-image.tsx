import { ImageResponse } from "next/og";
import { getProductDetail } from "../../../server-action/product";
import { Product } from "../../../types/product";

// Route segment config
export const runtime = "edge";

export const alt = "Product";
export const size = {
    width: 800,
    height: 400,
};

export const contentType = "image/jpg";

export default async function Image({
    params,
}: {
    params: { productId: string };
}) {
    const data = await getProductDetail(params.productId);

    const product = data.data as Product;
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    fontSize: 32,
                    fontWeight: 600,
                    padding: "48px",
                }}
            >
                {/* eslint-disable-next-line */}
                <img src={product.attributes.images[0]} alt="Page" />
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
