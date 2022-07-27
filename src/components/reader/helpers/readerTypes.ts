// This file exports common types used by /reader components.

import { Book } from "../../../helpers/generalTypes";
import { MouseEventHandler } from "react";

export interface PossibleReaderScreenStates {
    bookInfo: Book | undefined;
    localInfo: File | undefined;
    arrayBuffer: ArrayBuffer;
}

export interface PossibleReaderLandingStates {
    bookInfo: Book;
    url: string;
    secondaryUrl: string;
}

/* Describes a user savedBooks schema.
You absolutely should use createBookInfoList and createArrayBufferList to effectively use this schema.
Both functions will return you useful arrays in an ordered manner.


Files are saved as ArrayBuffer to be used by react-reader.

 */
export type SavedBooks = {
    lastBook: ArrayBuffer | null;
    secondBook: ArrayBuffer | null;
    firstBook: ArrayBuffer | null;
    lastBookInfo: Book | null;
    secondBookInfo: Book | null;
    firstBookInfo: Book | null;
};

/* A type definition for the props that the ReaderBookFigure component will receive. */
export interface ReaderBookFigureProps {
    book: Book;
    cover: string;
    coverDone: boolean;
    onClickFunction: MouseEventHandler;
}
