import { MDBRipple, MDBSpinner } from "mdb-react-ui-kit";
import React from "react";
import { ReaderBookFigureProps } from "../helpers/readerTypes";
import { Link, useNavigate } from "react-router-dom";
import { Size, useWindowSize } from "../../general/useWindowSize";
import { navigateToBook } from "../../../helpers/generalFunctions";

export default function ReaderBookFigureResponsive({
    book,
    cover,
    coverDone,
    onClickFunction,
}: ReaderBookFigureProps) {
    const size: Size = useWindowSize();
    const navigate = useNavigate();
    const onMobile = size.width < 600;
    return (
        <div
            className={
                onMobile
                    ? "mb-3 pt-2 border-white border-top flex-grow-1"
                    : "reader-figure-container me-3"
            }
        >
            <figure
                className={
                    onMobile
                        ? "figure d-flex library-row"
                        : "figure d-flex flex-column"
                }
            >
                <div
                    id="cover-div"
                    className={onMobile ? "me-2 library-figure-img" : "w-100"}
                >
                    {coverDone ? (
                        <></>
                    ) : (
                        <MDBSpinner
                            style={{
                                width: "1rem",
                                height: "1rem",
                                marginTop: "1vh",
                                marginLeft: "1vh",
                                zIndex: "5",
                            }}
                            color="dark"
                            className="position-absolute ms-1 mt-1"
                        />
                    )}

                    <MDBRipple
                        className="bg-image hover-overlay shadow-1-strong w-100"
                        rippleTag="div"
                        rippleColor="light"
                    >
                        <img
                            src={cover}
                            alt="Capa do livro"
                            className="w-100"
                        />

                        <a onClick={onClickFunction}>
                            <div
                                className="mask"
                                style={{
                                    backgroundColor: "rgba(251, 251, 251, 0.2)",
                                }}
                            />
                        </a>
                    </MDBRipple>
                </div>
                <figcaption
                    id="info-div"
                    className={
                        onMobile
                            ? ""
                            : "w-100 border rounded-7 rounded-top border-dark border-top-0 bg-black bg-opacity-50 p-2 recommendation-caption flex-grow-1"
                    }
                >
                    <p className="">
                        <strong>Título: </strong> <br />
                        {book.title}
                    </p>
                    <p className="">
                        <strong>Autor(a)(s): </strong> <br />
                        {book.authors}
                    </p>
                    <p className="">
                        <strong>Tamanho: </strong> <br />
                        {book.size}
                    </p>
                    <p className="">
                        <strong>Status: </strong> <br />
                        {book.category ? (
                            <span>Rastreando.</span>
                        ) : (
                            <span>
                                <abbr title="Abra a partir de sua biblioteca para salvar o progresso online.">
                                    Não rastreado.
                                    <br />
                                </abbr>
                            </span>
                        )}
                    </p>
                    <span className="">
                        <strong>Informações: </strong> <br />
                        {book.category ? (
                            <Link to={`/user/login?md5=${book.md5}`}>
                                Visualizar na biblioteca
                            </Link>
                        ) : (
                            <Link
                                to={`/book/${book.topic}/${book.md5}`}
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    navigateToBook(book, navigate);
                                }}
                            >
                                Visualizar informações
                            </Link>
                        )}
                    </span>
                </figcaption>
            </figure>
        </div>
    );
}
