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
                className="book-info-title"
                style={{ fontSize: "1.7rem", overflowWrap: "anywhere" }}
            >
                {book.title}
            </span>
        </>
    );
}
