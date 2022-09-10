import Skeleton from "react-loading-skeleton";
import React from "react";

export default function SimpleFigureSkeleton({
    loadingClassName,
}: {
    loadingClassName?: string;
}) {
    return (
        <Skeleton
            enableAnimation
            className={loadingClassName ? loadingClassName : "w-100 h-100"}
        />
    );
}
