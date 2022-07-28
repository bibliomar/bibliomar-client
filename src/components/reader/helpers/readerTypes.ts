// This file exports common types used by /reader components.

import { Book } from "../../../helpers/generalTypes";
import React, { MouseEventHandler } from "react";

// State to be passed to ReaderMain component, making it usable.
export interface PossibleReaderScreenStates {
    arrayBuffer: ArrayBuffer;
    onlineFile: Book | undefined;
    localFile: File | undefined;
    category?: string;
}

// State to be passed to ReaderLanding component, depending on its value, the component will render different subcomponents.
export interface PossibleReaderLandingStates {
    bookInfo: Book;
    url: string;
    secondaryUrl?: string;
    category?: string;
}

/**
 * Props that the component ReaderDownloader will receive.
 *
 * url corresponds to IPFS.io and secondaryUrl to Pinata.
 */
export interface ReaderDownloaderProps {
    userLoggedIn: boolean;
    url: string;
    secondaryUrl?: string;
    bookInfo: Book;
    savedBooks?: SavedBooks;
    category?: string;
}

/* Describes a user savedBooks schema.
You absolutely should use createBookInfoList and createArrayBufferList to effectively use this schema.
Both functions will return you useful arrays in an ordered manner.


Files are saved as ArrayBuffer to be used by react-reader.
Be sure to not save values as undefined, but as null.
 */

// Describes a given entry in SavedBooks, this entry is an object containing these properties.
export interface SavedBookEntry {
    arrayBuffer: ArrayBuffer;
    bookInfo: Book;
}

// Describes a SavedBooks object, which will be used to save up to 3 books in localForage.
export type SavedBooks = {
    firstBook: SavedBookEntry | null | undefined;
    secondBook: SavedBookEntry | null | undefined;
    thirdBook: SavedBookEntry | null | undefined;
};

/* A type definition for the props that the ReaderBookFigure component will receive. */
export interface ReaderBookFigureProps {
    book: Book;
    cover: string;
    coverDone: boolean;
    onClickFunction: MouseEventHandler;
}

export type ThemeColors = [string, string, string];

export interface ReaderNavbarProps {
    currentTheme: ThemeColors;
    setCurrentTheme: React.Dispatch<React.SetStateAction<ThemeColors>>;
}
