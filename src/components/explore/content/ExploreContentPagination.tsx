import Paginator from "../../general/Paginator";
import React from "react";

interface Props {
    pageChangeHandler: (evt: any) => void;
    pageCount: number;
}

export default function ExploreContentPagination({
    pageCount,
    pageChangeHandler,
}: Props) {
    const renderPagination = () => {
        if (pageCount < 1) {
            return null;
        } else {
            return (
                <div className="ms-auto me-auto mt-4 p-2 rounded-3 basic-container-alt">
                    <Paginator
                        pageChangeHandler={pageChangeHandler}
                        pageCount={pageCount}
                    />
                </div>
            );
        }
    };
    return renderPagination();
}
