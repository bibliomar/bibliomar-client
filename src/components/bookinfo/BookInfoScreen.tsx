import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { Book } from "../general/helpers/generalTypes";
import BookInfoDesktop from "./BookInfoDesktop";
import axios from "axios";
import { DownloadLinks } from "../general/helpers/generalTypes";
import { Size, useWindowSize } from "../general/helpers/useWindowSize";
import BookInfoMobile from "./BookInfoMobile";
import {
    backendUrl,
    findBookInLibrary,
} from "../general/helpers/generalFunctions";
import { SavedBookEntry, SavedBooks } from "../reader/helpers/readerTypes";
import localforage from "localforage";
import { findBookLocally } from "../reader/helpers/readerFunctions";
import BlankLoadingSpinner from "../general/BlankLoadingSpinner";
import useDownloadLinks from "../general/helpers/useDownloadLinks";
import useMetadata from "../general/helpers/useMetadata";

export interface BookInfoSubProps {
    bookInfo: Book;
    setBookInfo: React.Dispatch<SetStateAction<Book | undefined>>;
    downloadLinks: DownloadLinks | undefined;
    savedBook: SavedBookEntry | null;
    downloadLinksError: boolean;
}

export default function BookInfoScreen() {
    const params = useParams();
    const md5 = params.md5!;
    let navigate = useNavigate();

    const size: Size = useWindowSize();
    const topicContext: string | undefined = useOutletContext();
    const [bookInfo, setBookInfo] = useMetadata(md5, topicContext);
    const [downloadLinks, downloadLinksError] = useDownloadLinks(
        md5,
        topicContext
    );
    const [savedBook, setSavedBook] = useState<SavedBookEntry | null>(null);

    const getSavedBook = async () => {
        const ls = localforage.createInstance({
            driver: localforage.INDEXEDDB,
        });
        const possibleSavedBooks = await ls.getItem<SavedBooks | null>(
            "saved-books"
        );
        if (possibleSavedBooks && md5) {
            const savedBooksArray = Object.values(possibleSavedBooks);
            const savedBookIndex = await findBookLocally(md5);
            if (savedBookIndex != null && savedBooksArray != null) {
                setSavedBook(savedBooksArray[savedBookIndex]);
            }
        }
    };

    useEffect(() => {
        if (md5 == null) {
            navigate("/book/error", { replace: true });
            return;
        }
        const md5Match = md5.match("^[0-9a-fA-F]{32}$");
        if (md5Match == null) {
            navigate("/book/error", { replace: true });
            return;
        }
        // The functions that actually does the heavy working.
        // Done this way because i prefer working with async/await syntax.
        getSavedBook().then();
    }, [md5, topicContext]);

    return (
        <div className="d-flex flex-column align-items-center">
            {bookInfo ? (
                <div className="basic-container book-info-container mb-5">
                    {size.width > 768 ? (
                        <BookInfoDesktop
                            bookInfo={bookInfo}
                            setBookInfo={setBookInfo}
                            downloadLinks={downloadLinks}
                            savedBook={savedBook}
                            downloadLinksError={downloadLinksError}
                        />
                    ) : (
                        <BookInfoMobile
                            bookInfo={bookInfo}
                            setBookInfo={setBookInfo}
                            downloadLinks={downloadLinks}
                            savedBook={savedBook}
                            downloadLinksError={downloadLinksError}
                        />
                    )}
                </div>
            ) : (
                <BlankLoadingSpinner />
            )}
        </div>
    );
}
