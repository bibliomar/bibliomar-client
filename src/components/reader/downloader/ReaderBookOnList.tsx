import { Book } from "../../../helpers/generalTypes";
import React, { useEffect, useState } from "react";
import ReaderBookFigure from "../figure/ReaderBookFigure";
import Break from "../../general/Break";
import { MDBBtn } from "mdb-react-ui-kit";
import SmallLine from "../../general/SmallLine";
import { PossibleReaderScreenStates, SavedBooks } from "../helpers/readerTypes";
import { useNavigate } from "react-router-dom";
import { findBookLocally, updateBookLocally } from "../helpers/readerFunctions";

interface Props {
    bookInfo: Book;
    arrayBuffer: ArrayBuffer;
    savedBooks: SavedBooks;
}

export default function ReaderBookOnList({ bookInfo, arrayBuffer }: Props) {
    const navigate = useNavigate();

    const updateBookIfOutdated = async () => {
        const savedBookIndex = await findBookLocally(bookInfo.md5);
        if (savedBookIndex == null) {
            navigate("/reader", { replace: true });
            return;
        }
        // This will update the bookInfo for this specific savedBook, updating the category property.
        await updateBookLocally(bookInfo, savedBookIndex);
    };
    const [bookUpdated, setBookUpdated] = useState<boolean>(false);

    useEffect(() => {
        updateBookIfOutdated().then(() => setBookUpdated(true));
    }, []);
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
                    disabled={!bookUpdated}
                >
                    Visualizar lista
                </MDBBtn>
                <Break />
                <MDBBtn
                    disabled={!bookUpdated}
                    size="lg"
                    onClick={() => {
                        const readerScreenState: PossibleReaderScreenStates = {
                            onlineFile: bookInfo,
                            arrayBuffer: arrayBuffer,
                            localFile: undefined,
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
                    Esse livro já está na sua lista de livros salvos, e caso
                    tenha vindo de sua biblioteca, já está sincronizado.
                </span>
            </div>
        </div>
    );
}
