import { Book } from "../../../helpers/generalTypes";
import React from "react";
import ReaderBookFigure from "../figure/ReaderBookFigure";
import Break from "../../general/Break";
import { MDBBtn } from "mdb-react-ui-kit";
import SmallLine from "../../general/SmallLine";
import { removeSavedBook } from "../helpers/readerFunctions";
import { PossibleReaderScreenStates, SavedBooks } from "../helpers/readerTypes";
import { useNavigate } from "react-router-dom";

interface Props {
    savedBookIndex: number;
    bookInfo: Book;
    arrayBuffer: ArrayBuffer;
    savedBooks: SavedBooks;
}

export default function ({
    bookInfo,
    arrayBuffer,
    savedBooks,
    savedBookIndex,
}: Props) {
    const navigate = useNavigate();
    return (
        <div className="bg-black p-2 rounded-3 bg-opacity-50 text-light saved-list-div d-flex justify-content-center flex-wrap">
            <span className="fw-bold lead">Continuar leitura?</span>
            <Break />
            <SmallLine flexGrow />

            <Break />
            <ReaderBookFigure
                spotlight
                book={bookInfo}
                timeout={0}
                itemNumber={0}
                arrayBuffer={arrayBuffer}
            />
            <Break />
            <div className="d-flex flex-wrap justify-content-center">
                <MDBBtn
                    onClick={async () => {
                        navigate("/reader");
                    }}
                    color="info"
                    size="sm"
                    className="mb-3"
                >
                    Visualizar lista
                </MDBBtn>
                <Break />
                <MDBBtn
                    size="lg"
                    onClick={() => {
                        const readerScreenState: PossibleReaderScreenStates = {
                            arrayBuffer: arrayBuffer,
                            bookInfo: bookInfo,
                            localInfo: undefined,
                        };
                        navigate(`${bookInfo.title}`, {
                            state: readerScreenState,
                        });
                    }}
                >
                    Continuar
                </MDBBtn>
                <Break />
                <span className="text-muted mt-3">
                    Esse livro já está na sua lista de livros salvos.
                </span>
            </div>
        </div>
    );
}
