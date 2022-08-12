import { Book } from "../../general/helpers/generalTypes";
import Break from "../../general/Break";

interface Props {
    book: Book;
}

export default function BookInfoFile({ book }: Props) {
    return (
        <div className="book-info-title d-flex flex-wrap">
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>Formato</strong>:{" "}
                {book.extension ? book.extension.toUpperCase() : "Indefinido"}
            </span>
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>Tamanho</strong>: {book.size ? book.size : "Indefinido"}
            </span>
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>Linguagem:</strong>:{" "}
                {book.language
                    ? book["language"] === "Portuguese"
                        ? "Português"
                        : book["language"]
                    : "Indefinido"}
            </span>

            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>Ano</strong>: {book.year ? book.year : "Indefinido."}
            </span>
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>Editora</strong>:{" "}
                {book.publisher ? book.publisher : "Indefinido."}
            </span>
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>Edição</strong>:{" "}
                {book.edition ? book.edition : "Indefinido."}
            </span>
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>Série</strong>:{" "}
                {book.series ? book.series : "Indefinido."}
            </span>
        </div>
    );
}
