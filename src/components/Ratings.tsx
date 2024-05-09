import Image from "next/image";
import React, { useCallback, useMemo } from "react";

interface RatingProps {
    rating: number;
    isDetail?: boolean;
}

const Ratings: React.FC<RatingProps> = (props) => {
    const { rating, isDetail } = props;

    const starSize = useMemo<number>(() => {
        if (isDetail) return 16;
        return 10.55;
    }, [isDetail]);

    const renderStar = useCallback(
        (rating: number, tresshold: number): string => {
            const roundedNumber = Math.round(rating * 2) / 2;
            if (roundedNumber > tresshold) {
                if (roundedNumber - tresshold === 0.5) return "/half-star.png";
                return "/star.png";
            }

            return "/star-empty.png";
        },
        []
    );

    const renderStar1 = useCallback(() => {
        return (
            <Image
                src={renderStar(rating, 0)}
                width={starSize}
                height={starSize}
                alt="star"
            />
        );
    }, [rating, renderStar, starSize]);
    const renderStar2 = useCallback(() => {
        return (
            <Image
                src={renderStar(rating, 1)}
                width={starSize}
                height={starSize}
                alt="star"
            />
        );
    }, [rating, renderStar, starSize]);
    const renderStar3 = useCallback(() => {
        return (
            <Image
                src={renderStar(rating, 2)}
                width={starSize}
                height={starSize}
                alt="star"
            />
        );
    }, [rating, renderStar, starSize]);
    const renderStar4 = useCallback(() => {
        return (
            <Image
                src={renderStar(rating, 3)}
                width={starSize}
                height={starSize}
                alt="star"
            />
        );
    }, [rating, renderStar, starSize]);
    const renderStar5 = useCallback(() => {
        return (
            <Image
                src={renderStar(rating, 4)}
                width={starSize}
                height={starSize}
                alt="star"
            />
        );
    }, [rating, renderStar, starSize]);
    return (
        <div className="flex items-center h-fit gap-x-1">
            {renderStar1()}
            {renderStar2()}
            {renderStar3()}
            {renderStar4()}
            {renderStar5()}
        </div>
    );
};

export default Ratings;
