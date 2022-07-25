import differenceInMinutes from "date-fns/differenceInMinutes";
import BlankLoadingSpinner from "../../general/BlankLoadingSpinner";
import Break from "../../general/Break";
import React, { useEffect, useState } from "react";
import ReaderDownloaderMessage from "./ReaderDownloaderMessage";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import fileToArrayBuffer from "file-to-array-buffer";
import localforage from "localforage";
import { Book } from "../../../helpers/types";
import { useNavigate } from "react-router-dom";
import ReaderBookOnList from "./ReaderBookOnList";

// Files are saved as ArrayBuffer to be used by react-reader.
export type SavedBooks = {
    lastBook: ArrayBuffer | null;
    lastBookInfo: Book | null;
    secondBook: ArrayBuffer | null;
    secondBookInfo: Book | null;
    firstBook: ArrayBuffer | null;
    firstBookInfo: Book | null;
};

interface Props {
    url: string;
    bookInfo: Book;
    savedBooks?: SavedBooks;
}

export const saveOnForage = async (
    arrayBuffer: ArrayBuffer,
    bookInfo: Book
) => {
    const ls = localforage.createInstance({
        driver: localforage.INDEXEDDB,
    });

    let newSavedBooks: SavedBooks;

    const savedBooksCache: SavedBooks | null = await ls.getItem("saved-books");
    if (savedBooksCache) {
        // The first book is going to be deleted, so we are removing it's md5 info to save space.
        if (savedBooksCache.firstBookInfo) {
            localStorage.removeItem(
                `${savedBooksCache.firstBookInfo.md5}-page`
            );
        }
        newSavedBooks = {
            lastBook: arrayBuffer,
            lastBookInfo: bookInfo,
            secondBook: savedBooksCache.lastBook,
            secondBookInfo: savedBooksCache.lastBookInfo,
            firstBook: savedBooksCache.secondBook,
            firstBookInfo: savedBooksCache.secondBookInfo,
        };
    } else {
        newSavedBooks = {
            lastBook: arrayBuffer,
            lastBookInfo: bookInfo,
            secondBook: null,
            secondBookInfo: null,
            firstBook: null,
            firstBookInfo: null,
        };
    }
    await ls.setItem("saved-books", newSavedBooks);
};

export default function ({ url, bookInfo, savedBooks }: Props) {
    const navigate = useNavigate();
    //Should be in KB.
    const [downloadProgress, setDownloadProgress] = useState<number>(0);
    const [downloadStatus, setDownloadStatus] = useState<number>(0);
    const [downloadSize, setDownloadSize] = useState<number>(0);
    //-1 means that this book is not saved.
    const [savedBookBufferIndex, setSavedBookBufferIndex] =
        useState<number>(-1);

    let savedBooksInfoArray: (Book | undefined)[] | any = undefined;
    let savedBooksBufferArray: (ArrayBuffer | undefined)[] | any = undefined;

    if (savedBooks) {
        savedBooksBufferArray = [
            savedBooks.lastBook,
            savedBooks.secondBook,
            savedBooks.firstBook,
        ];
        savedBooksInfoArray = [
            savedBooks.lastBookInfo,
            savedBooks.secondBookInfo,
            savedBooks.firstBookInfo,
        ];
    }

    const downloadBook = async () => {
        const config: AxiosRequestConfig = {
            url: url,
            method: "GET",
            responseType: "blob",
            onDownloadProgress: (evt) => {
                //Transforms sizes from bytes to kb.
                const maxSize = evt.total / 1000;
                const loadedSize = evt.total / 1000;
                //Only sets downloadSize on first fired event.
                if (maxSize !== downloadSize) {
                    setDownloadSize(maxSize);
                }
                setDownloadProgress(loadedSize);
            },
        };
        try {
            setDownloadStatus(103);
            let req: AxiosResponse = await axios.request(config);
            setDownloadStatus(200);
            console.log(req);
            const arrayBuffer = await fileToArrayBuffer(req.data);
            await saveOnForage(arrayBuffer, bookInfo);
            navigate(`${bookInfo.title}`, {
                state: {
                    arrayBuffer: arrayBuffer,
                    bookInfo: bookInfo,
                    localInfo: undefined,
                },
            });
        } catch (e: any) {
            if (e.response) {
                console.error(e.response);
                setDownloadStatus(e.response.status);
                return;
            }
            console.error(e);
            setDownloadStatus(500);
            return;
        }
    };

    useEffect(() => {
        //For strict mode double mounting...
        let ignore = false;
        if (savedBooks != null) {
            console.log(savedBooks);
            console.log(savedBooksInfoArray);
            if (savedBooksInfoArray.includes(bookInfo)) {
                console.log("its true");
                return setSavedBookBufferIndex(
                    savedBooksInfoArray.indexOf(bookInfo)
                );
            }
        }

        /*
        if (!ignore) {
            downloadBook().then();
        }

         */

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <div className="d-flex flex-wrap justify-content-center">
            {savedBookBufferIndex === -1 ? (
                <>
                    <BlankLoadingSpinner />
                    <Break />
                    <ReaderDownloaderMessage
                        downloadProgress={downloadProgress}
                        downloadStatus={downloadStatus}
                        downloadSize={downloadSize}
                    />
                </>
            ) : (
                <ReaderBookOnList
                    bookInfo={bookInfo}
                    arrayBuffer={savedBooksBufferArray[savedBookBufferIndex]}
                />
            )}
        </div>
    );
}
