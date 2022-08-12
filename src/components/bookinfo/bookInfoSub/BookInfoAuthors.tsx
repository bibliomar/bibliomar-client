import { Book } from "../../general/helpers/generalTypes";
import Break from "../../general/Break";
import SmallLine from "../../general/SmallLine";

interface Props {
    book: Book;
}

export default function BookInfoAuthors({ book }: Props) {
    return (
        <>
            <span
                className="book-info-title mb-2 mt-3"
                style={{ fontSize: "1.2rem" }}
            >
                {book.authors}
            </span>
        </>
    );
}
