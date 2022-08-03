import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MDBBtn, MDBRipple, MDBSpinner } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { Book } from "../../general/helpers/generalTypes";
import { getCover } from "../../general/helpers/generalFunctions";

interface Props {
    book: Book;
    timeout: number;
    itemNumber: number;
}

export default function RecommendationBookFigure(props: Props) {
    const book: Book = props.book;
    let navigate = useNavigate();
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
        <figure className="figure d-flex flex-column">
            {coverDone ? (
                <></>
            ) : (
                <MDBSpinner
                    style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        marginTop: "1vh",
                        marginLeft: "1vh",
                        zIndex: "3",
                    }}
                    color="dark"
                    className="position-absolute"
                />
            )}

            <MDBRipple
                className="bg-image hover-zoom shadow-1-strong figure-img recommendation mb-0"
                rippleTag="div"
                rippleColor="light"
            >
                <img className="w-100 h-100" src={cover} alt="Capa do livro" />

                <a href={`/search?category=${book.topic}&q=${book.title}`}>
                    <div
                        className="mask"
                        style={{
                            backgroundColor: "rgba(0,0,0,0.0)",
                        }}
                    />
                </a>
            </MDBRipple>

            <figcaption
                className="figure-caption text-wrap text-light border rounded-bottom rounded-2
                border-dark border-top-0 bg-black bg-opacity-50 p-2 recommendation-caption flex-grow-1"
            >
                <p className="">
                    <strong>Título: </strong> <br />
                    {book.title}
                </p>
                <span className="">
                    <strong>Autor(a)(s): </strong> <br />
                    {book["authors"]}
                </span>
            </figcaption>
        </figure>
    );
}
