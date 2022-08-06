import { Book } from "../../general/helpers/generalTypes";

interface Props {
    book: Book;
}

export default function BookInfoFile({ book }: Props) {
    return (
        <div className="book-info-title">
            <span className="me-4">
                Idioma:{" "}
                {book["language"] === "Portuguese"
                    ? "Português"
                    : book["language"]}
            </span>
            <span className="me-4">
                Arquivo: {book.extension ? book.extension.toUpperCase() : null}
            </span>
            <span className="me-4">
                Tamanho: {book.size ? book.size : null}
            </span>
        </div>
    );
}
