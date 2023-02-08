import { MDBBtn } from "mdb-react-ui-kit";
import { Book, DownloadLinks } from "../../general/helpers/generalTypes";
import {
    PossibleReaderLandingState,
    SavedBookEntry,
    SavedBooks,
} from "../../reader/helpers/readerTypes";
import { useNavigate } from "react-router-dom";
import Break from "../../general/Break";
import { useTranslation } from "react-i18next";

interface Props {
    book: Book;
    downloadLinks?: DownloadLinks;
    savedBook: SavedBookEntry | null;
}

export default function BookInfoReadOnline({
    downloadLinks,
    book,
    savedBook,
}: Props) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="d-flex flex-wrap justify-content-center">
            {book.extension !== "epub" ? (
                <span
                    className="mb-1 book-info-title"
                    style={{ fontSize: "0.9rem" }}
                >
                    {t("bookinfo:onlyEpubFiles")}
                </span>
            ) : null}

            <Break />
            <MDBBtn
                className="dbutton mb-3"
                type="button"
                size="lg"
                onClick={() => {
                    if (
                        downloadLinks &&
                        book.extension &&
                        book.extension.toLowerCase() === "epub"
                    ) {
                        // State to be used by ReaderLanding on /reader
                        let readerLandingState: PossibleReaderLandingState = {
                            bookInfo: book,
                        };

                        navigate("/reader", {
                            state: readerLandingState,
                        });
                    }
                }}
                disabled={
                    (book.extension &&
                        book.extension.toLowerCase() !== "epub") ||
                    downloadLinks == undefined
                }
            >
                {book.progress && book.category
                    ? "Continuar leitura"
                    : "Ler online"}
            </MDBBtn>
        </div>
    );
}
