import { Book } from "../../../helpers/types";
import React from "react";
import ReaderBookFigure from "../figure/ReaderBookFigure";
import Break from "../../general/Break";
import { MDBBtn } from "mdb-react-ui-kit";

interface Props {
    bookInfo: Book;
    arrayBuffer: ArrayBuffer;
}

export default function ({ bookInfo, arrayBuffer }: Props) {
    return (
        <div className="bg-black p-2 rounded-3 bg-opacity-50 text-light saved-list-div d-flex justify-content-center flex-wrap">
            <div className="">
                <span className="fw-bold lead">Continuar lendo?</span>
            </div>
            <Break />
            <ReaderBookFigure
                spotlight
                book={bookInfo}
                timeout={0}
                itemNumber={0}
                arrayBuffer={arrayBuffer}
            />
            <Break />
            <div className="d-flex flex-wrap">
                <MDBBtn>Continuar</MDBBtn>
                <Break />
                <MDBBtn color="danger" size="sm">
                    Remover livro
                </MDBBtn>
            </div>
        </div>
    );
}
