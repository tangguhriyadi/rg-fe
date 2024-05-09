export type Product = {
    id: string;
    type: string;
    attributes: Attribute;
};

export type Attribute = {
    id: number;
    name: string;
    info: string;
    description: string;
    points: number;
    slug: string;
    stock: number;
    images: string[];
    isNew: number;
    rating: number;
    numOfReviews: number;
    isWishlist: number;
};
