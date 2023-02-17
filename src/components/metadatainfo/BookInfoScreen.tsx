import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import React, {
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { Metadata } from "../general/helpers/generalTypes";
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
import { AuthContext } from "../general/helpers/generalContext";
import { toast, ToastContainer, useToastContainer } from "react-toastify";

export interface BookInfoSubProps {
    metadata: Metadata;
    updateMetadata: () => Promise<void>;
    downloadLinks: DownloadLinks | undefined;
    downloadLinksError: boolean;
}

export default function BookInfoScreen() {
    const params = useParams();
    const md5 = params.md5;
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const size: Size = useWindowSize();
    let topicContext: string | undefined = useOutletContext();
    if (topicContext == "sci-tech") {
        topicContext = "scitech";
    }
    const [metadata, updateMetadata] = useMetadata(md5, topicContext);
    const [downloadLinks, downloadLinksError] = useDownloadLinks(
        md5,
        topicContext
    );

    useEffect(() => {
        if (md5 == null) {
            navigate("/metadataList/error", { replace: true });
            return;
        }
        const md5Match = md5.match("^[0-9a-fA-F]{32}$");
        if (md5Match == null) {
            navigate("/metadataList/error", { replace: true });
            return;
        }
    }, [md5, topicContext]);

    return (
        <>
            <div className="d-flex flex-column align-items-center">
                {metadata ? (
                    <div className="basic-container book-info-container mb-5">
                        {size.width > 768 ? (
                            <BookInfoDesktop
                                metadata={metadata}
                                updateMetadata={updateMetadata}
                                downloadLinks={downloadLinks}
                                downloadLinksError={downloadLinksError}
                            />
                        ) : (
                            <BookInfoMobile
                                metadata={metadata}
                                updateMetadata={updateMetadata}
                                downloadLinks={downloadLinks}
                                downloadLinksError={downloadLinksError}
                            />
                        )}
                    </div>
                ) : (
                    <BlankLoadingSpinner />
                )}
                <ToastContainer
                    closeOnClick={true}
                    limit={5}
                    draggable
                    draggablePercent={50}
                />
            </div>
        </>
    );
}
