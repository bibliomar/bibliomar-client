import BlankLoadingSpinner from "../../general/BlankLoadingSpinner";
import Break from "../../general/Break";
import React, { useEffect, useState } from "react";
import ReaderDownloaderMessage from "./ReaderDownloaderMessage";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import fileToArrayBuffer from "file-to-array-buffer";
import { Book } from "../../../helpers/generalTypes";
import { useNavigate } from "react-router-dom";
import ReaderBookOnList from "./ReaderBookOnList";
import { SavedBooks } from "../helpers/readerTypes";
import {
    createArrayBufferList,
    createBookInfoList,
    saveBooks,
} from "../helpers/readerFunctions";
import localforage from "localforage";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInSeconds from "date-fns/differenceInSeconds";

//Primary URL equals to IFPS.io, and the second one to Pinata.
interface Props {
    userLoggedIn: boolean;
    url: string;
    secondaryUrl: string;
    bookInfo: Book;
    savedBooks?: SavedBooks;
}

export default function ({
    userLoggedIn,
    url,
    secondaryUrl,
    bookInfo,
    savedBooks,
}: Props) {
    const navigate = useNavigate();
    console.log("opens");
    const [failedFirstAttempt, setFailedFirstAttempt] =
        useState<boolean>(false);

    //Should be in KB.
    const [downloadProgress, setDownloadProgress] = useState<number>(0);
    const [downloadStatus, setDownloadStatus] = useState<number>(0);
    const [downloadSize, setDownloadSize] = useState<number>(0);
    //-1 means that this book is not saved.
    const [savedBookIndex, setSavedBookIndex] = useState<number>(-1);

    let savedBooksInfoArray: (Book | null)[] | undefined = undefined;
    let savedBooksBufferArray: (ArrayBuffer | null)[] | undefined = undefined;

    if (savedBooks) {
        savedBooksBufferArray = createBookInfoList(savedBooks);
        savedBooksInfoArray = createArrayBufferList(savedBooks);
    }

    const downloadBook = async (requestUrl: string) => {
        const config: AxiosRequestConfig = {
            url: requestUrl,
            method: "GET",
            responseType: "blob",
            // Equals to 120 seconds.
            timeout: 120000,

            onDownloadProgress: (evt) => {
                //Transforms sizes from bytes to kb.
                const maxSize = evt.total / 1000;
                const loadedSize = evt.total / 1000;
                //Only sets downloadSize and status on first fired event.
                if (downloadStatus !== 201) {
                    setDownloadStatus(201);
                }
                if (maxSize !== downloadSize) {
                    setDownloadSize(maxSize);
                }

                setDownloadProgress(loadedSize);
            },
        };
        try {
            setDownloadStatus(103);
            console.log(downloadStatus);
            let req: AxiosResponse = await axios.request(config);

            //setDownloadStatus(200);
            const arrayBuffer = await fileToArrayBuffer(req.data);
            await saveBooks(arrayBuffer, bookInfo);
            //Saves current time in last-download, so we can define the last time the user has made a download.
            await localforage.setItem("last-download", new Date());
            navigate(`${bookInfo.title}`, {
                state: {
                    arrayBuffer: arrayBuffer,
                    bookInfo: bookInfo,
                    localInfo: undefined,
                },
            });
        } catch (e: any) {
            console.error(e);
            setDownloadStatus(e.response ? e.response.status : 500);
            setTimeout(() => {
                setFailedFirstAttempt(true);
            }, 2000);
            return;
        }
    };

    useEffect(() => {
        //For strict mode double mounting...
        let ignore = false;

        if (
            savedBooks != null &&
            savedBooksInfoArray &&
            savedBooksBufferArray
        ) {
            let isBookSaved: boolean = false;
            savedBooksInfoArray.forEach((el, i) => {
                if (el != null) {
                    if (el.md5 === bookInfo.md5) {
                        setSavedBookIndex(i);
                        isBookSaved = true;
                    }
                }
            });
            if (isBookSaved) {
                return;
            }

            return navigate("/reader");
        }

        if (!ignore) {
            /*
            In minutes.
            If the user is logged, no restriction.
            If it's not, 5 minutes.
             */
            const downloadTimeLimit = userLoggedIn ? 0 : 5;
            /*
            In seconds.
            We wait for 15 seconds because otherwise it could result in blocks from the servers.
             */
            const minDownloadTimeLimit = 15;

            /*
            In MB.
            If the user is logged, he can download up to 15mb.
            If it's not, 5mb.
             */
            const downloadSizeLimit = userLoggedIn ? 15 : 5;
            const fileSize = Number.parseInt(bookInfo.size);
            if (fileSize > downloadSizeLimit) {
                setDownloadStatus(413);
                return;
            }
            localforage
                .getItem<number | null>("last-download")
                .then((lastDownloadTime) => {
                    if (lastDownloadTime != null) {
                        const differenceMinutes = differenceInMinutes(
                            new Date(),
                            lastDownloadTime
                        );
                        const differenceSeconds = differenceInSeconds(
                            new Date(),
                            lastDownloadTime
                        );
                        if (
                            differenceMinutes < downloadTimeLimit ||
                            differenceSeconds < minDownloadTimeLimit
                        ) {
                            setDownloadStatus(401);
                            return;
                        }
                    }
                });
            downloadBook(failedFirstAttempt ? secondaryUrl : url).then();
        }

        return () => {
            ignore = true;
        };
    }, [failedFirstAttempt]);

    return (
        <div className="d-flex flex-wrap justify-content-center w-100">
            {savedBookIndex === -1 ? (
                <>
                    <BlankLoadingSpinner />
                    <Break />
                    <ReaderDownloaderMessage
                        downloadProgress={downloadProgress}
                        downloadStatus={downloadStatus}
                        downloadSize={downloadSize}
                        failedFirstAttempt={failedFirstAttempt}
                        userLoggedIn={userLoggedIn}
                    />
                    <Break />
                    <span className="text-center text-muted mt-4">
                        Dica: você pode fazer outras coisas enquanto aguarda. O
                        servidor normalmente é lento.
                    </span>
                </>
            ) : savedBooks && savedBooksBufferArray ? (
                <ReaderBookOnList
                    savedBookIndex={savedBookIndex}
                    savedBooks={savedBooks}
                    bookInfo={bookInfo}
                    arrayBuffer={savedBooksBufferArray[savedBookIndex]!}
                />
            ) : null}
        </div>
    );
}
