import { Book } from "./generalTypes";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
    PossibleReaderLandingState,
    PossibleReaderScreenState,
} from "../../reader/helpers/readerTypes";
import React, { SetStateAction } from "react";
import axios from "axios";

export const navigateToBook = (book: Book, navigate: NavigateFunction) => {
    const bookStr = JSON.stringify(book);
    sessionStorage.setItem(`${book.md5}-info`, bookStr);
    navigate(`/book/${book.md5}`, { replace: false });
};

// Navigates to /reader route, where a given book may be downloaded or opened.
export const navigateToReaderLanding = (
    readerLandingState: PossibleReaderLandingState,
    navigate: NavigateFunction
) => {
    navigate("/reader", { state: readerLandingState });
};

// Navigates to Bibliomar Reader screen.
export const navigateToReaderScreen = (
    readerScreenState: PossibleReaderScreenState,
    navigate: NavigateFunction
) => {
    const title = readerScreenState.onlineFile
        ? readerScreenState.onlineFile.title
        : readerScreenState.localFile?.name;
    if (readerScreenState.arrayBuffer == null) {
        return navigate("/error");
    }
    if (
        title == null ||
        (readerScreenState.onlineFile == null &&
            readerScreenState.localFile == null)
    ) {
        return navigate("/error");
    }
    return navigate(`/reader/${title}`, { state: readerScreenState });
};

const getOnlineCover = async (md5: string) => {
    let reqUrl = `https://biblioterra.herokuapp.com/v1/cover/${md5}`;
    let request;
    try {
        request = await axios.get(reqUrl);
        sessionStorage.setItem(`${md5}-cover`, request?.data);
        return request?.data;
    } catch (e: any) {
        // 500 errors means Biblioterra couldn't find a cover.
        return null;
    }
};

// Retrieves a book's cover from cache or online, returns a TimeoutID, so it can be removed when the component un-mounts.
export const getCover = async (
    md5: string,
    setCover: React.Dispatch<React.SetStateAction<string>>,
    setCoverDone?: React.Dispatch<React.SetStateAction<boolean>>,
    timeout?: number
) => {
    let possibleCachedCover = sessionStorage.getItem(`${md5}-cover`) as string;
    if (possibleCachedCover) {
        setCoverDone ? setCoverDone(true) : null;
        setCover(possibleCachedCover);
        return undefined;
    } else {
        const coverTimeout: number = setTimeout(
            async () => {
                const onlineCover = await getOnlineCover(md5);
                if (onlineCover == null) {
                    setCoverDone ? setCoverDone(true) : null;
                    return;
                }
                setCover(onlineCover);
                setCoverDone ? setCoverDone(true) : null;
            },
            timeout ? timeout : 0
        );
        return coverTimeout;
    }
};
