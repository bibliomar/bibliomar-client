import { Book } from "../../general/helpers/generalTypes";
import { SavedBookEntry, SavedBooks } from "../../reader/helpers/readerTypes";

interface Props {
    book: Book;
    savedBook: SavedBookEntry | null;
}

export default function BookInfoBadges({ book }: Props) {
    return (
        <>
            <div className="badge book-info-badge me-1">
                {book.topic === "fiction" ? "Ficção" : "Não-ficção"}
            </div>

            <div className="badge book-info-badge">{book.series}</div>
        </>
    );
}
