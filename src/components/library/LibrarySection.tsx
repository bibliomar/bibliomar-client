import Break from "../general/Break";
import LibraryBookFigure from "./LibraryBookFigure";
import React from "react";
import { Link } from "react-router-dom";
import { Book } from "../general/helpers/generalTypes";
import SmallLine from "../general/SmallLine";

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
        <div className="d-flex flex-wrap justify-content-center mb-4 w-100">
            <div className="bg-black p-2 rounded-3 bg-opacity-75 text-light p-3 w-100">
                <div className="d-flex flex-wrap justify-content-center mb-2">
                    <span className="fw-bold lead">{props.message}</span>
                </div>
                <Break />
                <div className="d-flex flex-wrap justify-content-center">
                    {booksInfo.length > 0 ? (
                        booksInfo.map((el, i) => {
                            let timeout;
                            i === 0 ? (timeout = 1000) : (timeout = i * 1500);
                            return (
                                <LibraryBookFigure
                                    key={i * Math.random() * 100}
                                    book={el}
                                    timeout={timeout}
                                    bookCategory={props.bookCategory}
                                    setProgress={props.setProgress}
                                />
                            );
                        })
                    ) : (
                        <>
                            <SmallLine flexGrow />
                            <Break />
                            <span className="p-2">
                                Vazio, que tal adicionar alguns livros?
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
