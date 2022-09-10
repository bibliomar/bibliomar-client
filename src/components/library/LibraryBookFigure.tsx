import React from "react";
import { Book } from "../general/helpers/generalTypes";
import SimpleBookFigure from "../general/figure/SimpleBookFigure";
import useCover from "../general/helpers/useCover";

interface Props {
    book: Book;
    timeout: number;
    expanded?: boolean;
}

export default function LibraryBookFigure(props: Props) {
    let book = props.book;
    const [cover, coverDone] = useCover(book.md5, props.timeout);
    const href = `/book/${book.topic}/${book.md5}`;
    return (
        <div
            id="library-book-div"
            className={`${
                !props.expanded
                    ? "library-figure-row-img"
                    : "library-figure-img"
            } me-2 mb-3`}
        >
            <SimpleBookFigure
                book={book}
                cover={cover}
                loadingClassName="loading-skeleton-library"
                coverDone={coverDone}
                href={href}
            />
        </div>
    );
}
