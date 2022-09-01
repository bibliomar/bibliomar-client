import React from "react";

export default function LibraryFiltersIconWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="d-flex align-items-baseline">{children}</div>;
}
