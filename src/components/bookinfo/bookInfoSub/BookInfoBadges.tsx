import { Book } from "../../general/helpers/generalTypes";
import { MDBBadge } from "mdb-react-ui-kit";
import Break from "../../general/Break";

interface Props {
    book: Book;
}

export default function BookInfoBadges({ book }: Props) {
    return (
        <>
            <div className="badge book-info-badge me-1">
                {book.topic === "fiction" ? "Ficção" : "Não-ficção"}
            </div>

            <div className="badge book-info-badge">{book.series}</div>
            <div className="badge book-info-badge">
                {book["language"] === "Portuguese"
                    ? "Português"
                    : book["language"]}
            </div>
        </>
    );
}
