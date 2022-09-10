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

export interface BookInfoSubProps {
    bookInfo: Book;
    setBookInfo: React.Dispatch<SetStateAction<Book | undefined>>;
    downloadLinks: DownloadLinks | undefined;
    savedBook: SavedBookEntry | null;
    error: boolean;
}

async function getMetadata(md5: string, topic: string): Promise<Book | null> {
    let reqUrl = `${backendUrl}/v1/metadata/${topic}/${md5}`;
    try {
        let req = await axios.get(reqUrl);
        return req.data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

async function getDownloadLinks(md5: string, topic: string) {
    let reqUrl = `${backendUrl}/v1/downloads/${topic}/${md5}`;
    try {
        let req = await axios.get(reqUrl);
        return req.data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export default function BookInfoScreen() {
    let navigate = useNavigate();
    const size: Size = useWindowSize();
    const topicContext = useOutletContext() as string;
    const [bookInfo, setBookInfo] = useState<Book | undefined>(undefined);
    const [downloadLinks, setDownloadLinks] = useState<
        DownloadLinks | undefined
    >(undefined);
    const [bookError, setBookError] = useState<boolean>(false);
    const [savedBook, setSavedBook] = useState<SavedBookEntry | null>(null);

    const params = useParams();
    const md5 = params.md5;

    const getBookInfo = async () => {
        if (!md5) {
            return;
        }
        const metadata = await getMetadata(md5, topicContext);
        if (metadata != null) {
            setBookInfo(metadata);
            const libraryBook = await findBookInLibrary(md5);
            if (libraryBook !== null) {
                setBookInfo({
                    ...metadata,
                    progress: libraryBook.progress
                        ? libraryBook.progress
                        : undefined,
                    category: libraryBook.category,
                });
            }
        } else {
            navigate("/book/error", { replace: true });
            return;
        }
    };

    const getBookDownloads = async () => {
        if (!md5) {
            return;
        }
        const dlinks = await getDownloadLinks(md5, topicContext);
        if (dlinks) {
            setDownloadLinks(dlinks);
        } else {
            setBookError(true);
            return;
        }
    };

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
        getBookInfo().then();
        getBookDownloads().then();
        getSavedBook().then();
    }, []);

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
                            error={bookError}
                        />
                    ) : (
                        <BookInfoMobile
                            bookInfo={bookInfo}
                            setBookInfo={setBookInfo}
                            downloadLinks={downloadLinks}
                            savedBook={savedBook}
                            error={bookError}
                        />
                    )}
                </div>
            ) : (
                <BlankLoadingSpinner />
            )}
        </div>
    );
}
