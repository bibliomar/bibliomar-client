import React from "react";

interface Props {
    backgroundColorHex: string;
    className?: React.HTMLAttributes<HTMLDivElement>;
}

export default function Ellipse({ backgroundColorHex, className }: Props) {
    return (
        <div
            className={`position-relative ellipse ${className}`}
            style={{ backgroundColor: backgroundColorHex, overflow: "hidden" }}
        ></div>
    );
}
