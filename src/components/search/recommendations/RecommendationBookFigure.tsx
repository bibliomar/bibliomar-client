import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MDBBtn, MDBSpinner } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

type Book = {
    [key: string]: any;
};

interface Props {
    book: Book;
    timeout: number;
    itemNumber: number;
}

/**
 * It takes a string and a number, and returns a string or null
 * @param {string} md5 - The md5 hash of the book.
 * @param {number} itemNum - The item number of the book in the list.
 * @returns The cover image of the book.
 */

async function getCover(md5: string, itemNum: number) {
    let reqUrl = `https://biblioterra.herokuapp.com/v1/cover/${md5}`;
    let request;
    try {
        request = await axios.get(reqUrl);
    } catch (e: any) {
        // 500 errors means Biblioterra couldn't find a cover.
        return null;
    }
    if (request?.data) {
        const thisCoverInfo = {
            md5: md5,
            cover: request?.data,
        };

        localStorage.setItem(`${itemNum}-cover`, JSON.stringify(thisCoverInfo));
        return request?.data;
    }
    return null;
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
        let possibleCachedCover = localStorage.getItem(
            `${props.itemNumber}-cover`
        ) as string;

        if (possibleCachedCover) {
            let cachedCoverInfo = JSON.parse(possibleCachedCover);
            if (cachedCoverInfo.md5 === book.md5) {
                setCoverDone(true);
                setCover(cachedCoverInfo.cover);
                return;
            }
        } else {
            coverSetTimeout = setTimeout(() => {
                getCover(book.md5, props.itemNumber).then((r) => {
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
        <figure className="figure">
            {coverDone ? (
                <></>
            ) : (
                <MDBSpinner
                    style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        marginTop: "1vh",
                        marginLeft: "1vh",
                    }}
                    color="dark"
                    className="position-absolute"
                />
            )}
            <img
                className={`figure-img recommendation`}
                src={cover}
                alt="Capa do livro"
            />

            <figcaption
                className={`figure-caption text-wrap text-light border rounded-7 rounded-top border-dark border-top-0 bg-black bg-opacity-50 p-2 recommendation-caption`}
            >
                <p className="">
                    <strong>Título: </strong> <br />
                    {book.title}
                </p>
                <span className="">
                    <strong>Autor(a)(s): </strong> <br />
                    {book["author(s)"]}
                </span>
                <Link to={`/search?category=${book.topic}&q=${book.title}`}>
                    <MDBBtn className="mt-1 btn btn-secondary btn-rounded recommendation-button">
                        Pesquisar
                    </MDBBtn>
                </Link>
            </figcaption>
        </figure>
    );
}
