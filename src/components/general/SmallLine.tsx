import React from "react";

interface Props {
    flexGrow?: boolean;
}

export default function SmallLine({ flexGrow }: Props) {
    return <div className={`small-line ${flexGrow ? "flex-grow-1" : ""}`} />;
}
