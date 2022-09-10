import Break from "../general/Break";
import LibraryBookFigure from "./LibraryBookFigure";
import React, { useContext, useMemo } from "react";
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

    const books = useMemo(() => {
        return bookFiltering(
            bookCategorySetter(booksInfo, bookCategory),
            filtersContext.filters
        );
    }, [filtersContext.filters]);

    return (
        <div className="d-flex flex-row flex-wrap justify-content-start basic-container w-100 mb-4 p-3">
            <div className="d-flex flex-wrap justify-content-md-start justify-content-center w-100 mb-3">
                <div className="d-flex w-100">
                    <span className="fw-bold lead">{message}</span>

                    <Link to={"/library"} className="ms-auto">
                        <MDBIcon
                            fas
                            icon="caret-square-left"
                            className="text-accent"
                            size={"2x"}
                        />
                    </Link>
                </div>

                <Break />
                {books.length > 8 && (
                    <span className="text-muted">
                        Mostrando 8 de {books.length}
                    </span>
                )}
            </div>
            <Break />
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start w-100">
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
                    <div className="d-flex justify-content-center w-100">
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
            </div>
        </div>
    );
}
