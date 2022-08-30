import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBBtn, MDBRipple } from "mdb-react-ui-kit";
import Break from "../../general/Break";
import { Book, ThemeOptions } from "../../general/helpers/generalTypes";
import { getCover } from "../../general/helpers/generalFunctions";
import FigureCoverSkeleton from "../../general/FigureCoverSkeleton";
import { Theme } from "../../general/helpers/generalContext";

interface Props {
    result: Book;
    timeout: number;
    lastElement: boolean;
}

export default function BookFigure(props: Props) {
    const theme = useContext(Theme).theme;
    const book: Book = props.result;
    const [cover, setCover] = useState<string>(
        "https://libgen.rocks/img/blank.png"
    );

    const [coverDone, setCoverDone] = useState<boolean>(false);

    useEffect(() => {
        let coverSetTimeout: number | undefined;

        getCover(book.md5, setCover, setCoverDone, props.timeout).then((r) => {
            coverSetTimeout = r;
        });

        return () => {
            clearTimeout(coverSetTimeout);
        };
    }, []);

    return (
        <figure className="figure d-flex flex-column result-div me-3">
            <MDBRipple
                className={`bg-image ${
                    coverDone ? "hover-overlay" : undefined
                } shadow-1-strong w-100 figure-img mb-1`}
                rippleTag="div"
                rippleColor="light"
            >
                <img className="w-100 h-100" src={cover} alt="Capa do livro" />
                <a href={`/book/${book.topic}/${book.md5}`}>
                    <FigureCoverSkeleton coverDone={coverDone} />
                </a>
            </MDBRipple>

            <figcaption
                className={`figure-caption text-wrap border rounded-7 rounded-top border-dark
            border-top-0 basic-container-alt pt-1 w-100 flex-grow-1 d-flex flex-column text-color`}
                style={{ fontSize: "1rem" }}
            >
                <div className="d-flex flex-wrap">
                    <span className="mx-2 mb-1">
                        <strong>Título: </strong>
                        {book.title}
                    </span>
                    <Break />
                    <span className="mx-2 mb-1">
                        <strong>Autor(a)(s): </strong>
                        {book["authors"]}
                    </span>
                    <Break />
                    <p className="mx-2 mb-2">
                        <strong>Arquivo: </strong>
                        {book.extension
                            ? book.extension.toUpperCase()
                            : null}, {book.size}
                    </p>
                    <Break />
                </div>

                <Link
                    className="d-flex justify-content-center w-100 mb-2 mt-auto"
                    to={`/book/${book.topic}/${book.md5}`}
                >
                    <MDBBtn className="btn btn-secondary btn-rounded">
                        Mais informações
                    </MDBBtn>
                </Link>
            </figcaption>
        </figure>
    );
}
