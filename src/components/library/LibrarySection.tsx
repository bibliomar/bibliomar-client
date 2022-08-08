import Break from "../general/Break";
import LibraryBookFigure from "./LibraryBookFigure";
import React from "react";
import { Link } from "react-router-dom";
import { Book } from "../general/helpers/generalTypes";

interface Props {
    expanded?: boolean;
    message: string;
    bookCategory: string;
    booksInfo: Book[];
    setProgress: React.Dispatch<React.SetStateAction<number>>;
}

export default function LibrarySection(props: Props) {
    // Defines a category property for each book with the correct value.
    const bookCategorySetter = () => {
        return props.booksInfo.map((book) => {
            book.category = props.bookCategory;
            return book;
        });
    };
    const booksInfo = bookCategorySetter();
    return (
        <div className="d-flex flex-wrap justify-content-center mb-4">
            <div className="bg-black p-2 rounded-3 bg-opacity-75 text-light p-3 library-section-container">
                <div className="d-flex flex-wrap justify-content-center mb-2">
                    <span className="fw-bold lead">{props.message}</span>
                </div>
                <Break />
                <div className="d-flex flex-wrap justify-content-center">
                    {booksInfo.length > 0 ? (
                        booksInfo.map((el, i) => {
                            if (!props.expanded) {
                                if (i < 4) {
                                    let timeout;
                                    i === 0
                                        ? (timeout = 1000)
                                        : (timeout = i * 1500);
                                    return (
                                        <div
                                            key={i * Math.random() * 100}
                                            id="figure-div"
                                            className="w-100"
                                        >
                                            <LibraryBookFigure
                                                book={el}
                                                timeout={timeout}
                                                bookCategory={
                                                    props.bookCategory
                                                }
                                                setProgress={props.setProgress}
                                            />
                                        </div>
                                    );
                                }
                            } else {
                                let timeout;
                                i === 0
                                    ? (timeout = 1000)
                                    : (timeout = i * 1500);
                                return (
                                    <div
                                        key={i * Math.random() * 100}
                                        id="figure-div"
                                        className="w-100"
                                    >
                                        <LibraryBookFigure
                                            book={el}
                                            timeout={timeout}
                                            bookCategory={props.bookCategory}
                                            setProgress={props.setProgress}
                                        />
                                    </div>
                                );
                            }
                        })
                    ) : (
                        <>
                            <div className="border-white border-top flex-grow-1 p-1" />
                            <Break />
                            <span className="p-2">
                                Vazio, que tal adicionar alguns livros?
                            </span>
                        </>
                    )}
                    {!props.expanded ? (
                        booksInfo.length > 5 ? (
                            <div className="d-flex justify-content-start">
                                <Link to={props.bookCategory}>
                                    E mais {booksInfo.length - 5}
                                </Link>
                            </div>
                        ) : null
                    ) : null}
                </div>
            </div>
        </div>
    );
}
