// This file exports common types used by /reader components.

import { Book } from "../../../helpers/generalTypes";
import React, { MouseEventHandler } from "react";
import { NavigateFunction } from "react-router-dom";
import { ReactReaderStyle } from "react-reader";

// State to be passed to ReaderMain component, making it usable.
export interface PossibleReaderScreenStates {
    arrayBuffer: ArrayBuffer;
    onlineFile: Book | undefined;
    localFile: File | undefined;
}

// State to be passed to ReaderLanding component, depending on its value, the component will render different subcomponents.
export interface PossibleReaderLandingStates {
    bookInfo: Book;
    url: string;
    secondaryUrl?: string;
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
    firstBook: SavedBookEntry | null;
    secondBook: SavedBookEntry | null;
    thirdBook: SavedBookEntry | null;
};

/* A type definition for the props that the ReaderBookFigure component will receive. */
export interface ReaderBookFigureProps {
    book: Book;
    cover: string;
    coverDone: boolean;
    onClickFunction: MouseEventHandler;
}

export type ReaderThemeColors = [string, string, string];

export interface ReaderNavbarProps {
    readerSettings: ReaderSettings;
    setReaderSettings: React.Dispatch<React.SetStateAction<ReaderSettings>>;
    modalToggle?: boolean;
    setModalToggle?: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Avaiable theme names.
 * Use in createReactReaderStyle and selectRenditionTheme.
 */
export enum ReaderThemeOptions {
    default = "default",
    dark = "dark",
    amoled = "amoled",
    easily = "easily",
}

export enum ManagerOptions {
    default = "default",
    continuous = "continuous",
}

export enum FlowOptions {
    default = "auto", // Based on OPF settings, defaults to "paginated"
    paginated = "paginated", // Left to right, paginated rendering
    scrolled = "scrolled", // Scrolled viewing, works best with
}

// This interface defines the settings the reader has, which may be changed in the ReaderNavbar modal.
export interface ReaderSettings {
    // Screen
    // This one is the only one not inside the modal.
    fullscreen: boolean;

    // Theming
    // The name of the theme that should be used.
    themeName: ReaderThemeOptions;
    readerStyles: ReactReaderStyle;

    // Pagination
    // If swiping to turn pages is enabled
    swipe: boolean;
    // This one should be set based on "flow" below. Set to "default" if flow is "default / paginated", else "continuous"
    // Two options.
    manager: ManagerOptions;
    // Sets the direction of the page.
    // Three options.
    flow: FlowOptions;
}
