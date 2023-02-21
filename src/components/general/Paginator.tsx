import ReactPaginate from "react-paginate";

interface PaginatorProps {
    pageChangeHandler: (evt: any) => void;
    pageCount: number;
}

export default function Paginator({
    pageCount,
    pageChangeHandler,
}: PaginatorProps) {
    return (
        <ReactPaginate
            onPageChange={pageChangeHandler}
            pageRangeDisplayed={3}
            breakLabel={"..."}
            nextLabel={"»"}
            previousLabel={"«"}
            pageCount={pageCount}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination mb-0"
            activeClassName="active"
        />
    );
}
