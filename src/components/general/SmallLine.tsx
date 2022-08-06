import React from "react";

interface Props {
    flexGrow?: boolean;
    className?: string;
}

export default function SmallLine({ flexGrow, className }: Props) {
    return (
        <div
            className={`small-line ${flexGrow ? "flex-grow-1" : ""} ${
                className ? className : ""
            }`}
        />
    );
}
