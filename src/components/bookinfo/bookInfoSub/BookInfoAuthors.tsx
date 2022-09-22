import { Book } from "../../general/helpers/generalTypes";
import Break from "../../general/Break";
import SmallLine from "../../general/SmallLine";
import { Link } from "react-router-dom";

interface Props {
    book: Book;
}

export default function BookInfoAuthors({ book }: Props) {
    const authorSearchUrl = `/search?type=author&q=${book.authors}`;
    return (
        <>
            <span
                className="book-info-title mb-2 mt-3"
                style={{ fontSize: "1.2rem" }}
            >
                <Link to={authorSearchUrl}>{book.authors}</Link>
            </span>
        </>
    );
}
