import BlankLoadingSpinner from "../../general/BlankLoadingSpinner";
import Break from "../../general/Break";
import React, { useContext, useEffect, useRef, useState } from "react";
import ReaderDownloaderMessage from "./ReaderDownloaderMessage";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import fileToArrayBuffer from "file-to-array-buffer";
import { useNavigate } from "react-router-dom";
import { saveBookLocally } from "../helpers/readerFunctions";
import localforage from "localforage";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInSeconds from "date-fns/differenceInSeconds";
import {
    PossibleReaderScreenState,
    ReaderDownloaderProps,
} from "../helpers/readerTypes";
import { backendUrl } from "../../general/helpers/generalFunctions";
import { Auth } from "../../general/helpers/generalContext";

export default function ReaderDownloader({
    savedBooks,
    bookInfo,
}: ReaderDownloaderProps) {
    console.log("Welcome to Bibliomar's downloader!");
    console.log("Rest assured, your books are not saved in our servers.");

    const navigate = useNavigate();
    const authContext = useContext(Auth);
    const userLoggedIn = authContext.userLogged;

    //Should be in KB.
    //KB = Byte * 1000
    const [downloadProgress, setDownloadProgress] = useState<number>(0);

    const [downloadStatus, setDownloadStatus] = useState<number>(0);
    const [downloadSize, setDownloadSize] = useState<number>(0);

    const downloadBook = async () => {
        const config: AxiosRequestConfig = {
            url: `${backendUrl}/v1/temp-download/${bookInfo.topic}/${bookInfo.md5}`,
            method: "GET",
            responseType: "blob",
            // Equals to 300 seconds.
            timeout: 300000,

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
            let req: AxiosResponse = await axios.request(config);
            console.log(req);
            const blobData: Blob = req.data;
            // If the download book is neither an epub nor text/plain
            if (
                !blobData.type.includes("epub") &&
                !blobData.type.includes("text")
            ) {
                setDownloadStatus(403);
                setTimeout(() => {
                    navigate(-1);
                }, 6000);
                return;
            } else {
                setDownloadStatus(200);
            }

            const arrayBuffer = await fileToArrayBuffer(blobData);
            await saveBookLocally(arrayBuffer, bookInfo);
            // Saves current time in last-download, so we can define the last time the user has made a download.
            await localforage.setItem("last-download", new Date());
            const readerScreenState: PossibleReaderScreenState = {
                arrayBuffer: arrayBuffer,
                onlineFile: bookInfo,
                localFile: undefined,
            };

            setTimeout(() => {
                navigate(`/reader/${bookInfo.md5}`, {
                    state: readerScreenState,
                    replace: true,
                });
            }, 3000);
        } catch (e: any) {
            console.error(e);
            setDownloadStatus(e.response ? e.response.status : 500);
            setTimeout(() => {
                location.reload();
            }, 3000);
            return;
        }
    };

    useEffect(() => {
        //For strict mode double mounting...
        let ignore = false;

        if (!ignore) {
            /*
            In minutes.
            If the user is logged, 1 minute restriction.
            If it's not, 5 minutes.
             */
            const downloadTimeLimit = userLoggedIn ? 1 : 5;
            /*
            In seconds.
            We wait for 30 seconds minimum because otherwise it could result in blocks from the servers.
             */
            const minDownloadTimeLimit = 30;

            /*
            In MB.
            If the user is logged, he can download up to 15mb.
            If it's not, 5mb.
             */

            const downloadSizeLimit = userLoggedIn ? 15 : 5;
            // If it's more than ~20, it's probably in Kb.
            const fileSize = Number.parseInt(bookInfo.size!);
            const sizeInMb = bookInfo.size?.includes("Mb");
            const sizeInGb = bookInfo.size?.includes("Gb");

            if (sizeInGb) {
                setDownloadStatus(413);
                return;
            }
            if (sizeInMb && fileSize > downloadSizeLimit) {
                setDownloadStatus(413);
                return;
            }
            localforage
                .getItem<Date | null>("last-download")
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
                        } else {
                            downloadBook().then();
                        }
                    } else {
                        downloadBook().then();
                    }
                });
        }

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <div className="d-flex flex-wrap justify-content-center w-100">
            <div className="basic-container d-flex flex-wrap justify-content-center p-3">
                <BlankLoadingSpinner />
                <Break />
                <ReaderDownloaderMessage
                    downloadProgress={downloadProgress}
                    downloadStatus={downloadStatus}
                    downloadSize={downloadSize}
                    userLoggedIn={userLoggedIn}
                />
                <Break />
                <span className="text-center text-muted mt-4">
                    Dica: Isso pode demorar um pouco, você pode trocar de aba
                    enquanto aguarda.
                </span>
                <Break />
                <span className="text-center text-muted mt-2">
                    Nós reiniciamos o download automaticamente em caso de erro.
                </span>
            </div>
        </div>
    );
}
