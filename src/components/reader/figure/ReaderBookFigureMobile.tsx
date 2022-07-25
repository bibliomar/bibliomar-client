import { ReaderBookFigureProps } from "./ReaderBookFigureDesktop";
import { Portal } from "react-portal";
import LibraryBookModal from "../../library/LibraryBookModal";
import LibraryBookIcon from "../../library/LibraryBookIcon";
import { MDBRipple, MDBSpinner } from "mdb-react-ui-kit";
import Break from "../../general/Break";
import React from "react";

export default function ({
    book,
    cover,
    coverDone,
    arrayBuffer,
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

                        <a>
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
                    <span className="overflow-hidden">{book["title"]}</span>

                    <Break />
                    <span className="fst-italic" style={{ fontSize: "0.8rem" }}>
                        {book["author(s)"]}
                    </span>
                </div>
            </div>
        </div>
    );
}
