import React from "react";

interface Props {
    flexGrow?: boolean;
}

export default function ({ flexGrow }: Props) {
    return (
        <div
            className={`border-white border-top p-1 ${
                flexGrow ? "flex-grow-1" : ""
            }`}
        />
    );
}
