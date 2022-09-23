import Paginator from "../../general/Paginator";
import React from "react";

interface Props {
    pageChangeHandler: (evt: any) => void;
    pageCount: number;
}

export default function LibraryPagination({
    pageCount,
    pageChangeHandler,
}: Props) {
    return (
        <div className="ms-auto me-auto mt-4 p-2 rounded-3 basic-container">
            <Paginator
                pageChangeHandler={pageChangeHandler}
                pageCount={pageCount}
            />
        </div>
    );
}
