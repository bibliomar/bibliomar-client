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

export default function SearchBarItemSimple({ text, book, timeout }: Props) {
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
        <div className="d-flex flex-wrap">
            <Highlighter search={text}>{book.title}</Highlighter>
        </div>
    );
}
