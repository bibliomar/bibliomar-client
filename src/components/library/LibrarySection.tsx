import Break from "../general/Break";
import LibraryBookFigure from "./LibraryBookFigure";
import React, { useContext } from "react";
import { Book, LibraryCategories } from "../general/helpers/generalTypes";
import { Filters } from "./helpers/libraryContext";
import equal from "fast-deep-equal/es6";
import {
    bookCategorySetter,
    bookFiltering,
    defaultFilters,
} from "./helpers/libraryFunctions";

interface Props {
    expanded?: boolean;
    message: string;
    bookCategory: LibraryCategories;
    booksInfo: Book[];
    setProgress: React.Dispatch<React.SetStateAction<number>>;
}

export default function LibrarySection(props: Props) {
    // Defines a category property for each book with the correct value.
    const filtersContext = useContext(Filters);

    const onDefaultFilters = equal(filtersContext.filters, defaultFilters);

    const books = bookFiltering(
        bookCategorySetter(props.booksInfo, props.bookCategory),
        filtersContext.filters
    );
    return (
        <div className="d-flex flex-row flex-wrap justify-content-start basic-container w-100 mb-4 p-3">
            <div className="d-flex flex-wrap justify-content-lg-start justify-content-center w-100 mb-3">
                <div className="d-flex flex-wrap justify-content-start mb-2">
                    <span className="fw-bold lead">{props.message}</span>
                </div>
                <Break />
                <div className="d-flex flex-wrap justify-content-center justify-content-lg-start w-100">
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
                                <span>
                                    Vazio, que tal adicionar algum livro?
                                </span>
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
        </div>
    );
}
