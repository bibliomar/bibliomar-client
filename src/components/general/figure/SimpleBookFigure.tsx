import { Book } from "../helpers/generalTypes";
import { MDBRipple } from "mdb-react-ui-kit";
import FigureCoverSkeleton from "../FigureCoverSkeleton";
import React from "react";

interface SimpleBookFigureProps {
    book: Book;
    cover: string;
    coverDone: boolean;
    href: string;
}

// A reusable book figure which shows the book info on top of its cover.
export default function SimpleBookFigure({
    book,
    cover,
    coverDone,
    href,
}: SimpleBookFigureProps) {
    return (
        <div className="position-relative w-100 h-100">
            <div className="simple-figure-bg text-light">
                <span
                    className="ms-2 text-nowrap simple-figure-text"
                    style={{ fontSize: "1.1em" }}
                >
                    {book.title}
                </span>
                <br />
                <span
                    className="ms-2 text-nowrap simple-figure-text"
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
                <a href={href}>
                    <FigureCoverSkeleton coverDone={coverDone} />
                </a>
            </MDBRipple>
        </div>
    );
}
