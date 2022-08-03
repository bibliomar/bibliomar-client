import Skeleton from "react-loading-skeleton";
import React from "react";

interface Props {
    coverDone: boolean;
}

export default function FigureCoverSkeleton({ coverDone }: Props) {
    return coverDone ? (
        <div
            className="mask"
            style={{
                backgroundColor: "rgba(255,255,255,0.15)",
            }}
        />
    ) : (
        <Skeleton className="mask" />
    );
}
