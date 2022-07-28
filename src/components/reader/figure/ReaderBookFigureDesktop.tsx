import { MDBRipple, MDBSpinner } from "mdb-react-ui-kit";
import React from "react";
import { ReaderBookFigureProps } from "../helpers/readerTypes";

export default function ReaderBookFigureDesktop({
    book,
    cover,
    coverDone,
    onClickFunction,
}: ReaderBookFigureProps) {
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

                <a onClick={onClickFunction}>
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
                <p className="">
                    <strong>Autor(a)(s): </strong> <br />
                    {book.authors}
                </p>
                <p className="">
                    <strong>Tamanho: </strong> <br />
                    {book.size}
                </p>
                <span className="">
                    <strong>Status: </strong> <br />
                    {book.category ? (
                        <span>Rastreando.</span>
                    ) : (
                        <span>
                            <abbr title="Abra a partir de sua biblioteca para salvar o progresso online.">
                                Não rastreado.
                            </abbr>
                        </span>
                    )}
                </span>
            </figcaption>
        </figure>
    );
}
