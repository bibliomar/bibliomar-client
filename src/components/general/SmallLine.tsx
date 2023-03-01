import React from "react";

interface Props {
    vertical?: boolean;
    flexGrow?: boolean;
    className?: string;
}

export default function SmallLine({ flexGrow, className, vertical }: Props) {
    return vertical ? (
        <div
            className={`small-line-vertical ${
                flexGrow ? "flex-grow-1" : "h-100"
            } ${className ? className : ""}`}
        />
    ) : (
        <div
            className={`small-line ${flexGrow ? "flex-grow-1" : "w-100"} ${
                className ? className : ""
            }`}
        />
    );
}
