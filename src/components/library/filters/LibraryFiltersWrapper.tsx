import React from "react";

interface Props {
    children: React.ReactNode;
}

export default function LibraryFiltersWrapper(props: Props) {
    return (
        <div className="d-flex flex-wrap justify-content-center me-2 ms-2 align-items-center">
            {props.children}
        </div>
    );
}
