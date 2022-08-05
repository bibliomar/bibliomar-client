import { Book } from "../../general/helpers/generalTypes";
import Break from "../../general/Break";
import SmallLine from "../../general/SmallLine";

interface Props {
    book: Book;
}

export default function BookInfoTitle({ book }: Props) {
    return (
        <>
            <span
                className="book-info-title mb-3"
                style={{ fontSize: "1.7rem" }}
            >
                {book.title}
            </span>
            <Break />
            <span
                className="book-info-title mb-2"
                style={{ fontSize: "1.1rem" }}
            >
                {book.authors}
            </span>
        </>
    );
}
