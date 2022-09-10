import { Size, useWindowSize } from "./helpers/useWindowSize";
import React from "react";

interface Breaking {
    className?: string;
    mobile?: boolean;
    desktop?: boolean;
}

// Talk about code golfing...
export default function Break({ className, mobile, desktop }: Breaking) {
    const size: Size = useWindowSize();
    return (
        <>
            {(!mobile && !desktop) || (mobile && desktop) ? (
                <div className={`break ${className}`} />
            ) : mobile && !desktop ? (
                size.width <= 768 ? (
                    <div className={`break ${className}`} />
                ) : null
            ) : !mobile && desktop ? (
                size.width >= 768 ? (
                    <div className={`break ${className}`} />
                ) : null
            ) : null}
        </>
    );
}
