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

//Primary URL equals to IFPS.io, and the second one to pinata.
interface Props {
    url: string;
    secondaryUrl: string;
    bookInfo: Book;
    savedBooks?: SavedBooks;
}

export default function ({ url, secondaryUrl, bookInfo, savedBooks }: Props) {
    const navigate = useNavigate();

    const [failedFirstAttempt, setFailedFirstAttempt] =
        useState<boolean>(false);

    //Should be in KB.
    const [downloadProgress, setDownloadProgress] = useState<number>(0);
    const [downloadStatus, setDownloadStatus] = useState<number>(0);
    const [downloadSize, setDownloadSize] = useState<number>(0);
    //-1 means that this book is not saved.
    const [savedBookIndex, setSavedBookIndex] = useState<number>(-1);
    console.log(savedBookIndex);

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
            // Equals to 30 seconds.
            timeout: 30000,

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
            await saveBooks(arrayBuffer, bookInfo);
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

        if (savedBooks != null) {
            if (savedBooksInfoArray && savedBooksBufferArray) {
                let isBookSaved = savedBooksInfoArray.map((el, i) => {
                    if (el != null) {
                        if (el.md5 === bookInfo.md5) {
                            setSavedBookIndex(i);
                            return el;
                        }
                    }
                });
                // Length > 0 means an entry was found in savedBooksInfoArray.
                if (isBookSaved.length > 0) {
                    return;
                } else {
                    return navigate("/reader");
                }
            }
            return navigate("/reader");
        }

        if (!ignore) {
            downloadBook(failedFirstAttempt ? secondaryUrl : url).then();
        }

        return () => {
            ignore = true;
        };
    }, [failedFirstAttempt]);

    return (
        <div className="d-flex flex-wrap justify-content-center">
            {savedBookIndex === -1 ? (
                <>
                    <BlankLoadingSpinner />
                    <Break />
                    <ReaderDownloaderMessage
                        downloadProgress={downloadProgress}
                        downloadStatus={downloadStatus}
                        downloadSize={downloadSize}
                        failedFirstAttempt={failedFirstAttempt}
                    />
                    <div className="d-flex justify-content-center mt-3">
                        <span className="text-muted">
                            Dica: você pode fazer outras coisas enquanto aguarda
                            ;)
                        </span>
                    </div>
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
