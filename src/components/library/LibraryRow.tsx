import { Book, LibraryCategories } from "../general/helpers/generalTypes";
import React, { useContext } from "react";
import LibraryBookFigure from "./LibraryBookFigure";
import Break from "../general/Break";
import { MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { Filters } from "./helpers/libraryContext";
import {
    bookCategorySetter,
    bookFiltering,
    defaultFilters,
} from "./helpers/libraryFunctions";
import equal from "fast-deep-equal/es6";

interface Props {
    title: string;
    message: string;
    bookCategory: LibraryCategories;
    booksInfo: Book[];
}

export default function LibraryRow({
    title,
    message,
    bookCategory,
    booksInfo,
}: Props) {
    const filtersContext = useContext(Filters);

    const onDefaultFilters = equal(filtersContext.filters, defaultFilters);

    const books = bookFiltering(
        bookCategorySetter(booksInfo, bookCategory),
        filtersContext.filters
    );

    return (
        <div className="d-flex flex-row flex-wrap justify-content-start basic-container w-100 mb-4 p-3">
            <div className="d-flex flex-wrap justify-content-lg-start justify-content-center w-100 mb-3">
                <div className="d-flex flex-wrap">
                    <MDBTooltip title={message} tag={"span"} placement={"auto"}>
                        <span className="fw-bold lead">{title}</span>
                    </MDBTooltip>
                </div>

                <Link to={bookCategory} className="ms-auto">
                    <MDBIcon
                        fas
                        icon="plus-square"
                        className="text-accent"
                        size={"2x"}
                    />
                </Link>

                <Break />
                {books.length > 8 && (
                    <span className="text-muted">
                        Mostrando 8 de {books.length}
                    </span>
                )}
            </div>
            <Break />
            <div className="d-flex flex-wrap justify-content-lg-start justify-content-center w-100">
                {books.length > 0
                    ? books.map((book, index) => {
                          if (index < 8) {
                              return (
                                  <LibraryBookFigure
                                      key={index * (Math.random() * 100)}
                                      book={book}
                                      timeout={index * 1500}
                                  />
                              );
                          }
                      })
                    : null}
                <Break />
                {books.length === 0 ? (
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
                ) : null}
            </div>
        </div>
    );
}
