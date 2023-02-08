import { Book } from "../../general/helpers/generalTypes";
import Break from "../../general/Break";
import { useTranslation } from "react-i18next";

interface Props {
    book: Book;
}

export default function BookInfoFile({ book }: Props) {
    const { t } = useTranslation();

    return (
        <div className="book-info-title d-flex flex-wrap">
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>{t("bookinfo:format")}</strong>:{" "}
                {book.extension ? book.extension.toUpperCase() : "Indefinido"}
            </span>
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>{t("bookinfo:filesize")}</strong>:{" "}
                {book.size ? book.size : t("bookinfo:undefinedField")}
            </span>
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>{t("bookinfo:language")}</strong>:{" "}
                {book.language ? book.language : t("bookinfo:undefinedField")}
            </span>

            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>{t("bookinfo:year")}</strong>:{" "}
                {book.year ? book.year : t("bookinfo:undefinedField")}
            </span>
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>{t("bookinfo:publisher")}</strong>:{" "}
                {book.publisher ? book.publisher : t("bookinfo:undefinedField")}
            </span>
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>{t("bookinfo:edition")}</strong>:{" "}
                {book.edition ? book.edition : t("bookinfo:undefinedField")}
            </span>
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>{t("bookinfo:series")}</strong>:{" "}
                {book.series ? book.series : t("bookinfo:undefinedField")}
            </span>
        </div>
    );
}
