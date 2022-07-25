import Break from "../../general/Break";
import RecommendationBookFigure from "../../search/recommendations/RecommendationBookFigure";
import BookFigure from "../../search/results/BookFigure";
import { SavedBooks } from "../downloader/ReaderDownloader";
import { Book } from "../../../helpers/types";
import ReaderBookFigure from "../figure/ReaderBookFigure";
import React from "react";
import SmallLine from "../../general/SmallLine";

export default function ({ savedBooks }: { savedBooks: SavedBooks }) {
    const bookInfoArray = [
        savedBooks.lastBookInfo,
        savedBooks.secondBookInfo,
        savedBooks.firstBookInfo,
    ];
    const bookArrayBuffers = [
        savedBooks.lastBook,
        savedBooks.secondBook,
        savedBooks.firstBook,
    ];

    return (
        <div className="bg-black p-2 rounded-3 bg-opacity-50 text-light saved-list-div">
            <div className="d-flex flex-wrap justify-content-center mb-2">
                <span className="fw-bold lead">Livros salvos</span>
            </div>
            <Break />
            <div className="d-flex flex-wrap justify-content-center">
                {bookInfoArray.map((el, i) => {
                    if (el != null && bookArrayBuffers[i] != null) {
                        return (
                            <ReaderBookFigure
                                arrayBuffer={bookArrayBuffers[i]!}
                                book={el}
                                timeout={0}
                                key={i}
                                itemNumber={i}
                            />
                        );
                    }
                })}
                <Break />
                <SmallLine flexGrow />
                <Break />
                <div
                    id="list-info-div"
                    className="text-muted text-center d-flex flex-wrap mb-2 justify-content-center"
                >
                    <span>
                        Nós salvamos até três livros para você ler a qualquer
                        momento.
                    </span>
                    <Break />
                    <span className="mt-2">
                        <strong>PS:</strong> Esses livros são salvos no{" "}
                        <strong>seu</strong> dispositivo. Não temos acesso a
                        seus livros, e nem monetizamos seus dados.
                    </span>
                </div>
            </div>
        </div>
    );
}
