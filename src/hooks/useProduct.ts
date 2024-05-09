"use client";

import { useState } from "react";
import { Product } from "../types/product";
import { axios } from "../plugin/axios";
import { useSearchParams } from "next/navigation";

export const useProductList = () => {
    const [items, setItems] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    const searchParams = useSearchParams();
    const rating4 = searchParams.get("rating4");
    const stock = searchParams.get("stock");
    const sort = searchParams.get("sort");

    const fetchData = async () => {
        setIsLoading(true);
        setIsError(false);

        try {
            const data: Product[] = await axios
                .get("/api/v2/gifts", {
                    params: {
                        page: page,
                        limit: 6,
                    },
                })
                .then((res) => res.data.data);

            if (rating4 && stock) {
                const filteredData = data.filter(
                    (d) => d.attributes.rating >= 4 && d.attributes.stock > 0
                );

                if (sort === "ulasan") {
                    filteredData.sort(
                        (a, b) =>
                            b.attributes.numOfReviews -
                            a.attributes.numOfReviews
                    );
                }

                setItems((prevItems) => [...prevItems, ...filteredData]);
                setPage((prevPage) => prevPage + 1);
                return;
            }

            if (rating4) {
                const filteredData = data.filter(
                    (d) => d.attributes.rating >= 4
                );

                if (sort === "ulasan") {
                    filteredData.sort(
                        (a, b) =>
                            b.attributes.numOfReviews -
                            a.attributes.numOfReviews
                    );
                }

                setItems((prevItems) => [...prevItems, ...filteredData]);
                setPage((prevPage) => prevPage + 1);
                return;
            }

            if (stock) {
                const filteredData = data.filter((d) => d.attributes.stock > 0);

                if (sort === "ulasan") {
                    filteredData.sort(
                        (a, b) =>
                            b.attributes.numOfReviews -
                            a.attributes.numOfReviews
                    );
                }

                setItems((prevItems) => [...prevItems, ...filteredData]);
                setPage((prevPage) => prevPage + 1);
                return;
            }

            if (sort === "ulasan") {
                data.sort(
                    (a, b) =>
                        b.attributes.numOfReviews - a.attributes.numOfReviews
                );
            }
            setItems((prevItems) => [...prevItems, ...data]);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchInitial = async () => {
        setIsLoading(true);
        setIsError(false);

        try {
            const data: Product[] = await axios
                .get("/api/v2/gifts", {
                    params: {
                        page: 1,
                        limit: 6,
                    },
                })
                .then((res) => res.data.data);

            if (rating4 && stock) {
                const filteredData = data.filter(
                    (d) => d.attributes.rating >= 4 && d.attributes.stock > 0
                );

                if (sort === "ulasan") {
                    filteredData.sort(
                        (a, b) =>
                            b.attributes.numOfReviews -
                            a.attributes.numOfReviews
                    );
                }

                setItems(filteredData);
                setPage(1);
                return;
            }

            if (rating4) {
                const filteredData = data.filter(
                    (d) => d.attributes.rating >= 4
                );

                if (sort === "ulasan") {
                    filteredData.sort(
                        (a, b) =>
                            b.attributes.numOfReviews -
                            a.attributes.numOfReviews
                    );
                }

                setItems(filteredData);
                setPage(1);
                return;
            }

            if (stock) {
                const filteredData = data.filter((d) => d.attributes.stock > 0);

                if (sort === "ulasan") {
                    filteredData.sort(
                        (a, b) =>
                            b.attributes.numOfReviews -
                            a.attributes.numOfReviews
                    );
                }

                setItems(filteredData);
                setPage(1);
                return;
            }

            if (sort === "ulasan") {
                data.sort(
                    (a, b) =>
                        b.attributes.numOfReviews - a.attributes.numOfReviews
                );
            }

            setItems(data);

            setPage(1);
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return { items, isLoading, isError, fetchData, fetchInitial };
};

export const useWishList = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const addWishList = async (id: number) => {
        setIsLoading(true);
        try {
            const data = await axios
                .post(`/api/v2/gifts/${id}/wishlist`)
                .then((res) => res.data.data);

            alert("Success add wishlist");

            return data;
        } catch (err) {
            alert(err);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, addWishList };
};
