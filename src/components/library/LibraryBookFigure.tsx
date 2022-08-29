import React, { useEffect, useState } from "react";

import { MDBRipple } from "mdb-react-ui-kit";

import { Book } from "../general/helpers/generalTypes";
import { getCover } from "../general/helpers/generalFunctions";
import FigureCoverSkeleton from "../general/FigureCoverSkeleton";

interface Props {
    book: Book;
    timeout: number;
    setProgress?: React.Dispatch<React.SetStateAction<number>>;
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
    }, []);

    return (
        <div
            id="library-book-div"
            className={`${
                !props.expanded
                    ? "library-figure-row-img"
                    : "library-figure-img"
            } position-relative me-2 mb-3`}
        >
            <div className="library-info-background text-light">
                <span
                    className="ms-2 text-nowrap library-info-text"
                    style={{ fontSize: "1.1em" }}
                >
                    {book.title}
                </span>
                <br />
                <span
                    className="ms-2 text-nowrap library-info-text"
                    style={{ fontSize: "0.85em" }}
                >
                    {book.authors}
                </span>
            </div>
            <MDBRipple
                className={`bg-image ${
                    coverDone ? "hover-overlay" : undefined
                } shadow-1-strong rounded w-100 h-100`}
                rippleTag="div"
                rippleColor="light"
            >
                <img
                    alt={"Capa do livro"}
                    src={cover}
                    className="w-100 h-100"
                    style={{ minHeight: "100%" }}
                />
                <a href={`/book/${book.topic}/${book.md5}`}>
                    <FigureCoverSkeleton coverDone={coverDone} />
                </a>
            </MDBRipple>
        </div>
    );
}
