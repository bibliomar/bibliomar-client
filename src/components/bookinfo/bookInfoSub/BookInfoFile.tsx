import { Book } from "../../general/helpers/generalTypes";
import Break from "../../general/Break";

interface Props {
    book: Book;
}

export default function BookInfoFile({ book }: Props) {
    return (
        <div className="book-info-title d-flex flex-wrap">
            <Break mobile className="mb-2" />
            <span className="me-4">
                Formato: {book.extension ? book.extension.toUpperCase() : null}
            </span>
            <Break mobile className="mb-2" />
            <span className="me-4">
                Tamanho: {book.size ? book.size : null}
            </span>
            <Break mobile className="mb-2" />
            <span className="me-4">MD5: {book.md5}</span>
        </div>
    );
}
