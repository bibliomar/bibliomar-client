import React, { useEffect, useState } from "react";

import { MDBRipple } from "mdb-react-ui-kit";

import { Book } from "../general/helpers/generalTypes";
import { getCover } from "../general/helpers/generalFunctions";
import FigureCoverSkeleton from "../general/FigureCoverSkeleton";
import SimpleBookFigure from "../general/figure/SimpleBookFigure";

interface Props {
    book: Book;
    timeout: number;
    expanded?: boolean;
}

export default function LibraryBookFigure(props: Props) {
    let book = props.book;
    const [cover, setCover] = useState<string>(
        "https://libgen.rocks/img/blank.png"
    );
    const [coverDone, setCoverDone] = useState<boolean>(false);

    useEffect(() => {
        let coverSetTimeout: number | undefined;
        getCover(book.md5, setCover, setCoverDone, props.timeout).then(
            (r) => (coverSetTimeout = r)
        );
        return () => {
            clearTimeout(coverSetTimeout);
        };
    }, [props.book]);

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
                coverDone={coverDone}
                href={`/book/${book.topic}/${book.md5}`}
            />
        </div>
    );
}
