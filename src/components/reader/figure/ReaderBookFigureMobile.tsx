import { MDBRipple, MDBSpinner } from "mdb-react-ui-kit";
import Break from "../../general/Break";
import React from "react";
import { ReaderBookFigureProps } from "../helpers/readerTypes";

export default function ReaderBookFigureMobile({
    book,
    cover,
    coverDone,
    onClickFunction,
}: ReaderBookFigureProps) {
    return (
        <div className={"mb-3 pt-2 border-white border-top flex-grow-1"}>
            <div className="d-flex library-row">
                <div id="cover-div" className="me-2 library-figure-img">
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
                <div id="info-div" className="">
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
                                    <br />
                                </abbr>
                            </span>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}
