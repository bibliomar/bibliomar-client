import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MDBBtn, MDBRipple, MDBSpinner } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { Book } from "../../../helpers/generalTypes";

interface Props {
    book: Book;
    timeout: number;
    itemNumber: number;
}

/**
 * It takes a string and a number, and returns a string or null
 * @param {string} md5 - The md5 hash of the book.
 * @returns The cover image of the book.
 */

async function getCover(md5: string) {
    let reqUrl = `https://biblioterra.herokuapp.com/v1/cover/${md5}`;
    let request;
    try {
        request = await axios.get(reqUrl);
        sessionStorage.setItem(`${md5}-cover`, request.data);
        return request.data;
    } catch (e: any) {
        // 500 errors means Biblioterra couldn't find a cover.
        return null;
    }
}

export default function RecommendationBookFigure(props: Props) {
    const book: Book = props.book;
    let navigate = useNavigate();
    const [cover, setCover] = useState<string>(
        "https://libgen.rocks/img/blank.png"
    );

    const [coverDone, setCoverDone] = useState<boolean>(false);

    useEffect(() => {
        let coverSetTimeout: number;
        let possibleCachedCover = sessionStorage.getItem(`${book.md5}-cover`);

        if (possibleCachedCover) {
            setCoverDone(true);
            setCover(possibleCachedCover);
            return;
        } else {
            coverSetTimeout = setTimeout(() => {
                getCover(book.md5).then((r) => {
                    if (r == null) {
                        setCoverDone(true);
                        return;
                    }
                    setCoverDone(true);
                    setCover(r);
                });
            }, props.timeout);
            return () => clearTimeout(coverSetTimeout);
        }
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
                className="bg-image hover-zoom shadow-1-strong figure-img recommendation"
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
                className="figure-caption text-wrap text-light border rounded-7
                rounded-top border-dark border-top-0 bg-black bg-opacity-50 p-2 recommendation-caption flex-grow-1"
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
