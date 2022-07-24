import Break from "../../general/Break";
import RecommendationBookFigure from "../../search/recommendations/RecommendationBookFigure";
import BookFigure from "../../search/results/BookFigure";
import { SavedBooks } from "../downloader/ReaderDownloader";
import { Book } from "../../search/Search";
import ReaderBookFigure from "../ReaderBookFigure";

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
        <div className="bg-black p-2 rounded-3 bg-opacity-25 text-light recommendation-div">
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
            </div>
        </div>
    );
}
