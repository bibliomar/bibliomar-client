import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MDBBtn, MDBRipple, MDBSpinner } from "mdb-react-ui-kit";
import Break from "../../general/Break";
import { Book } from "../../general/helpers/generalTypes";
import { getCover } from "../../general/helpers/generalFunctions";
import FigureCoverSkeleton from "../../general/FigureCoverSkeleton";

interface Props {
    result: Book;
    timeout: number;
    lastElement: boolean;
    setAjaxStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function BookFigure(props: Props) {
    const book: Book = props.result;
    let navigate = useNavigate();
    const [cover, setCover] = useState<string>(
        "https://libgen.rocks/img/blank.png"
    );

    const [coverDone, setCoverDone] = useState<boolean>(false);

    useEffect(() => {
        let coverSetTimeout: number | undefined;
        let ajaxStatusTimeout: number | undefined;

        getCover(book.md5, setCover, setCoverDone, props.timeout).then((r) => {
            coverSetTimeout = r;
            if (props.lastElement) {
                ajaxStatusTimeout = setTimeout(() => {
                    props.setAjaxStatus("done");
                }, 1000);
            }
        });

        return () => {
            clearTimeout(ajaxStatusTimeout);
            clearTimeout(coverSetTimeout);
        };
    }, []);

    return (
        <figure className="figure d-flex flex-column">
            <MDBRipple
                className="bg-image shadow-1-strong resultimg figure-img"
                rippleTag="div"
                rippleColor="light"
            >
                <img className="w-100 h-100" src={cover} alt="Capa do livro" />
                <a href={`/book/${book.topic}/${book.md5}`}>
                    <FigureCoverSkeleton coverDone={coverDone} />
                </a>
            </MDBRipple>

            <figcaption
                className="figure-caption text-wrap text-light border rounded-7 rounded-top border-dark
            border-top-0 bg-black bg-opacity-25 pt-1 bookcaption flex-grow-1 d-flex flex-column"
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
                        {book.extension.toUpperCase()}, {book.size}
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
