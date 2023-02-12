import { Highlighter } from "react-bootstrap-typeahead";
import React from "react";
import { Book } from "../../general/helpers/generalTypes";
import useCover from "../../general/helpers/useCover";
import BookFigureCover from "../../general/BookFigureCover";
import Break from "../../general/Break";
import { getBookInfoPath } from "../../general/helpers/generalFunctions";

interface Props {
    text: string;
    book: Book;
    timeout?: number;
}

export default function SearchBarFigure({ text, book, timeout }: Props) {
    const [cover, coverDone] = useCover(book, timeout);
    const bookHref = getBookInfoPath(book.topic, book.md5);
    let uppercaseAuthor = "";
    if (book.author) {
        uppercaseAuthor = `${book.author[0].toUpperCase()}${book.author.slice(
            1,
            book.author.length
        )}`;
    }
    return (
        <div className="d-flex flex-nowrap">
            <div
                id="search-bar-figure-cover"
                className="search-bar-figure-cover"
            >
                <div className="d-flex w-100">
                    <BookFigureCover
                        book={book}
                        cover={cover}
                        coverDone={coverDone}
                    />
                </div>
            </div>
            <div
                id="search-bar-figure-text"
                className="ms-2 d-flex flex-column justify-content-start"
            >
                <div className="d-flex flex-wrap">
                    <span style={{ fontSize: "1.0em" }} className="fw-bold">
                        {book.title}
                    </span>
                    <Break />
                    <span style={{ fontSize: "0.9em" }}>{uppercaseAuthor}</span>
                    <Break />
                    <span style={{ fontSize: "0.9em" }}>
                        {book.extension?.toUpperCase()}
                    </span>
                </div>
            </div>
        </div>
    );
}
