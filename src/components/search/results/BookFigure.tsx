import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MDBBtn, MDBRipple, MDBSpinner } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import Break from "../../general/Break";

type Book = {
    [key: string]: any;
};

interface Props {
    result: Book;
    timeout: number;
    lastElement: boolean;
    setAjaxStatus: React.Dispatch<React.SetStateAction<string>>;
}

async function getCover(md5: string) {
    let reqUrl = `https://biblioterra.herokuapp.com/v1/cover/${md5}`;
    let request;
    try {
        request = await axios.get(reqUrl);
    } catch (e: any) {
        // 500 errors means Biblioterra couldn't find a cover.
        return null;
    }
    if (request?.data) {
        sessionStorage.setItem(`${md5}-cover`, request?.data);
        return request?.data;
    }
    return null;
}

export default function BookFigure(props: Props) {
    const book: Book = props.result;
    let navigate = useNavigate();
    const [cover, setCover] = useState<string>(
        "https://libgen.rocks/img/blank.png"
    );

    const [coverDone, setCoverDone] = useState<boolean>(false);

    const navigateToBook = (evt: any) => {
        evt.preventDefault();
        const bookStr = JSON.stringify(book);
        sessionStorage.setItem(`${book.md5}-info`, bookStr);
        navigate(`/book/${book.topic}/${book.md5}`, { replace: false });
    };

    useEffect(() => {
        let coverSetTimeout: number;
        let ajaxStatusTimeout: number;
        let cachedCover = sessionStorage.getItem(`${book.md5}-cover`) as string;
        if (cachedCover) {
            setCoverDone(true);
            setCover(cachedCover);
            if (props.lastElement) {
                ajaxStatusTimeout = setTimeout(() => {
                    props.setAjaxStatus("done");
                }, 1000);
            }
            return;
        } else {
            if (props.lastElement) {
                ajaxStatusTimeout = setTimeout(() => {
                    props.setAjaxStatus("done");
                }, props.timeout);
            }
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
            return () => {
                clearTimeout(coverSetTimeout);
                clearTimeout(ajaxStatusTimeout);
            };
        }
    }, []);

    return (
        <figure className="figure book-figure">
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
                className="bg-image hover-zoom shadow-1-strong resultimg"
                rippleTag="div"
                rippleColor="light"
            >
                <img
                    className="w-100 h-100 figure-img"
                    src={cover}
                    alt="Capa do livro"
                />
                <a
                    href={`/book/${book.topic}/${book.md5}`}
                    onClick={navigateToBook}
                >
                    <div
                        className="mask"
                        style={{
                            backgroundColor: "rgba(0,0,0,0.0)",
                        }}
                    />
                </a>
            </MDBRipple>

            <figcaption className="figure-caption text-wrap text-light border rounded-7 rounded-top border-dark border-top-0 bg-black bg-opacity-25 pt-1 bookcaption">
                <div style={{ fontSize: "1rem" }} className="d-flex flex-wrap">
                    <span className="mx-2 mb-1">
                        <strong>Título: </strong>
                        {book.title}
                    </span>
                    <Break />
                    <span className="text-start mx-2">
                        <strong>Autor(a)(s): </strong>
                        {book["author(s)"]}
                    </span>
                    <Break />
                    <p className="mx-2">
                        <strong>Arquivo: </strong>
                        {book.extension.toUpperCase()}, {book.size}
                    </p>
                </div>
                <Link
                    className="d-flex justify-content-center"
                    to={`/book/${book.topic}/${book.md5}`}
                    onClick={navigateToBook}
                >
                    <MDBBtn className="mb-1 btn btn-secondary btn-rounded">
                        Mais informações
                    </MDBBtn>
                </Link>
            </figcaption>
        </figure>
    );
}
