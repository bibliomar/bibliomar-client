import Break from "../../general/Break";
import RecommendationBookFigure from "../../search/recommendations/RecommendationBookFigure";
import BookFigure from "../../search/results/BookFigure";
import { Book } from "../../../helpers/generalTypes";
import ReaderBookFigure from "../figure/ReaderBookFigure";
import React from "react";
import SmallLine from "../../general/SmallLine";
import { SavedBooks } from "../helpers/readerTypes";

export default function ({ savedBooks }: { savedBooks: SavedBooks }) {
    return (
        <div className="bg-black p-2 rounded-3 bg-opacity-50 text-light saved-list-div">
            <div className="d-flex flex-wrap justify-content-center mb-2">
                <span className="fw-bold lead">Salvos localmente</span>
            </div>
            <Break />
            <div className="d-flex flex-wrap justify-content-center">
                {Object.values(savedBooks).map((el, i) => {
                    if (el != null) {
                        return (
                            <ReaderBookFigure
                                arrayBuffer={el.arrayBuffer}
                                book={el.bookInfo}
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
                    className="text-center d-flex flex-wrap mb-2 justify-content-center"
                >
                    <span className="mt-2">
                        Livros não rastreados podem ter seu progresso perdido a
                        qualquer momento.
                    </span>
                    <Break />
                    <span className="mt-2">
                        Esses livros são salvos no <strong>seu</strong>{" "}
                        dispositivo, apenas o progresso de leitura é salvo em
                        sua conta.
                    </span>
                </div>
            </div>
        </div>
    );
}
