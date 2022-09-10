import { Book } from "../../general/helpers/generalTypes";
import { SavedBookEntry, SavedBooks } from "../../reader/helpers/readerTypes";

interface Props {
    book: Book;
    savedBook: SavedBookEntry | null;
}

export default function BookInfoBadges({ book, savedBook }: Props) {
    return (
        <>
            <div className="badge book-info-badge me-1 mb-1">
                {book.topic === "fiction" ? "Ficção" : "Não-ficção"}
            </div>
            <div className="badge book-info-badge me-1 mb-1">
                {book.category ? "Salvo na biblioteca" : null}
            </div>
            <div className="badge book-info-badge me-1 mb-1">
                {savedBook ? "Salvo localmente" : null}
            </div>
            <div className="badge book-info-badge me-1 mb-1">
                {book.progress ? "Leitura iniciada" : null}
            </div>
            <div className="badge book-info-badge mb-1">
                {book.series ? book.series : null}
            </div>
        </>
    );
}
