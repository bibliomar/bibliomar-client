import { Portal } from "react-portal";
import LibraryBookModal from "../../library/LibraryBookModal";
import LibraryBookIcon from "../../library/LibraryBookIcon";
import { MDBRipple, MDBSpinner } from "mdb-react-ui-kit";
import Break from "../../general/Break";
import React from "react";
import { ReaderBookFigureProps } from "../helpers/readerTypes";

export default function ({
    book,
    cover,
    coverDone,
    onClickFunction,
}: ReaderBookFigureProps) {
    return (
        <div
            className="mb-3 p-3 rounded-5 bg-dark bg-opacity-50"
            style={{ width: "fit-content" }}
        >
            <div className="d-flex">
                <div
                    id="cover-div"
                    className="me-2 reader-spotlight-figure-img"
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
                <div
                    id="info-div"
                    className="d-flex flex-column justify-content-start"
                >
                    <span className="mb-2">
                        <strong>Título: </strong> <br />
                        {book.title}
                    </span>

                    <span className="mb-2">
                        <strong>Autor(a): </strong> <br />
                        {book.authors}
                    </span>
                    <span className="mb-2">
                        <strong>Tamanho: </strong> <br />
                        {book.size}
                    </span>
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
                </div>
            </div>
        </div>
    );
}
