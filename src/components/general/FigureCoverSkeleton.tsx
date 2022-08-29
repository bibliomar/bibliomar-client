import Skeleton from "react-loading-skeleton";
import React from "react";

interface Props {
    coverDone: boolean;
}

export default function FigureCoverSkeleton({ coverDone }: Props) {
    return coverDone ? (
        <div className="mask" style={{ backgroundColor: "rgba(0,0,0,0.2)" }} />
    ) : (
        <Skeleton className="mask" />
    );
}
