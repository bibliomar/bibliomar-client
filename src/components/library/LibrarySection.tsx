import Break from "../general/Break";
import LibraryBookFigure from "./LibraryBookFigure";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Book, LibraryCategories } from "../general/helpers/generalTypes";
import { Filters } from "./helpers/libraryContext";
import equal from "fast-deep-equal/es6";
import {
    bookCategorySetter,
    bookFiltering,
    defaultFilters,
} from "./helpers/libraryFunctions";
import { MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Paginator from "../general/Paginator";
import LibraryPagination from "./pagination/LibraryPagination";

interface Props {
    message: string;
    bookCategory: LibraryCategories;
    booksInfo: Book[];
}

export default function LibrarySection({
    message,
    bookCategory,
    booksInfo,
}: Props) {
    const filtersContext = useContext(Filters);

    const onDefaultFilters = useMemo(() => {
        return equal(filtersContext.filters, defaultFilters);
    }, [filtersContext.filters]);

    const filteredBooks = useMemo(() => {
        return bookFiltering(
            bookCategorySetter(booksInfo, bookCategory),
            filtersContext.filters
        );
    }, [filtersContext.filters]);

    const itemsPerPage = 10;
    const [itemOffset, setItemOffset] = useState(0);
    const [books, setBooks] = useState<Book[]>([]);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setPageCount(Math.ceil(filteredBooks.length / itemsPerPage));
        setBooks(filteredBooks.slice(itemOffset, endOffset));
    }, [filteredBooks, itemOffset]);

    const pageChangeHandler = (evt: any) => {
        const newOffset = (evt.selected * itemsPerPage) % filteredBooks.length;
        setItemOffset(newOffset);
        setBooks(filteredBooks.slice(newOffset, newOffset + itemsPerPage));
    };

    return (
        <div className="d-flex flex-row flex-wrap justify-content-start basic-container w-100 mb-4 p-3">
            <div className="d-flex flex-wrap justify-content-md-start justify-content-center w-100 mb-3">
                <div className="d-flex flex-wrap w-100">
                    <span className="fw-bold lead">{message}</span>
                    <Link to={"/library"} className="ms-auto">
                        <MDBIcon
                            fas
                            icon="caret-square-left"
                            className="text-accent"
                            size={"2x"}
                        />
                    </Link>
                    <Break className="mb-1" />
                    <span className="text-muted">
                        <strong>{filteredBooks.length}</strong> livros nessa
                        categoria
                    </span>
                </div>

                <Break />
            </div>
            <Break />
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start  w-100">
                {books.length > 0 ? (
                    books.map((el, i) => {
                        let timeout;
                        i === 0 ? (timeout = 1000) : (timeout = i * 1500);
                        return (
                            <LibraryBookFigure
                                key={i * Math.random() * 100}
                                book={el}
                                timeout={timeout}
                            />
                        );
                    })
                ) : (
                    <div className="d-flex justify-content-center w-100 mb-3">
                        {onDefaultFilters ? (
                            <span>Vazio, que tal adicionar algum livro?</span>
                        ) : (
                            <span>
                                Nenhum livro corresponde aos filtros
                                selecionados.
                            </span>
                        )}
                    </div>
                )}
                <Break />
                {books.length > 0 ? (
                    <LibraryPagination
                        pageChangeHandler={pageChangeHandler}
                        pageCount={pageCount}
                    />
                ) : null}
            </div>
        </div>
    );
}
