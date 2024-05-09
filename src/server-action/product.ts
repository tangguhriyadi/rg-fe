import { Product } from "../types/product";

const BASE_URL = "https://recruitment.dev.rollingglory.com";

export const getProductDetail = async (id: string) => {
    try {
        const data = await fetch(`${BASE_URL}/api/v2/gifts/${id}`);

        return await data.json();
    } catch (err) {
        alert(err);
    }
};
