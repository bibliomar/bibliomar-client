import { Book } from "../../general/helpers/generalTypes";
import { SavedBookEntry, SavedBooks } from "../../reader/helpers/readerTypes";
import { useTranslation } from "react-i18next";

interface Props {
    book: Book;
    savedBook: SavedBookEntry | null;
}

export default function BookInfoBadges({ book, savedBook }: Props) {
    const { t } = useTranslation();
    return (
        <>
            <div className="badge book-info-badge me-1 mb-1">
                {book.topic === "fiction"
                    ? t("bookinfo:fiction")
                    : t("bookinfo:nonfiction")}
            </div>
            <div className="badge book-info-badge me-1 mb-1">
                {book.category ? t("bookinfo:onLibrary") : null}
            </div>

            <div className="badge book-info-badge mb-1">
                {book.series ? book.series : null}
            </div>
        </>
    );
}
