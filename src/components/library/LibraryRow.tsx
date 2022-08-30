import { Book } from "../general/helpers/generalTypes";
import React from "react";
import LibraryBookFigure from "./LibraryBookFigure";
import Break from "../general/Break";
import { MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

interface Props {
    message: string;
    bookCategory: string;
    booksInfo: Book[];
}

export default function LibraryRow({
    message,
    bookCategory,
    booksInfo,
}: Props) {
    const bookCategorySetter = () => {
        return booksInfo.map((book) => {
            book.category = bookCategory;
            return book;
        });
    };
    const books = bookCategorySetter();

    return (
        <div className="d-flex flex-row flex-wrap justify-content-start basic-container w-100 mb-4 p-3">
            <div className="d-flex flex-wrap justify-content-lg-start justify-content-center w-100 mb-3">
                <span className="fw-bold lead">{message}</span>
                <Link to={bookCategory} className="ms-auto">
                    <MDBIcon fas icon="plus-square" size={"2x"} />
                </Link>

                <Break />
                <span className="text-muted">
                    Mostrando {books.length > 8 ? 8 : books.length} de{" "}
                    {books.length}
                </span>
            </div>
            <Break />
            <div className="d-flex flex-wrap justify-content-lg-start justify-content-center w-100">
                {books.length > 0
                    ? books.map((book, index) => {
                          if (index < 8) {
                              return (
                                  <LibraryBookFigure
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
                        <span>Vazio, que tal adicionar mais livros?</span>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
