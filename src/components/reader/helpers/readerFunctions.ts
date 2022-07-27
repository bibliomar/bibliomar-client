// This file exports common functions used by components in /reader.

import { Book } from "../../../helpers/generalTypes";
import localforage from "localforage";
import { SavedBooks } from "./readerTypes";

//Saves or replaces a SavedBooks object in localforage.INDEXEDDB.
//
// It will then be used in everything associated with /reader.
export const saveBooks = async (arrayBuffer: ArrayBuffer, bookInfo: Book) => {
    const ls = localforage.createInstance({
        driver: localforage.INDEXEDDB,
    });

    let newSavedBooks: SavedBooks;

    const savedBooksCache: SavedBooks | null = await ls.getItem("saved-books");
    if (savedBooksCache) {
        // The first book is going to be deleted, so we are removing it's pagination info to save space.
        if (savedBooksCache.firstBookInfo) {
            localStorage.removeItem(
                `${savedBooksCache.firstBookInfo.title}-page`
            );
        }

        newSavedBooks = {
            lastBook: arrayBuffer,
            secondBook: savedBooksCache.lastBook,
            firstBook: savedBooksCache.secondBook,
            lastBookInfo: bookInfo,
            secondBookInfo: savedBooksCache.lastBookInfo,
            firstBookInfo: savedBooksCache.secondBookInfo,
        };
    } else {
        newSavedBooks = {
            lastBook: arrayBuffer,
            secondBook: null,
            firstBook: null,
            lastBookInfo: bookInfo,
            secondBookInfo: null,
            firstBookInfo: null,
        };
    }
    await ls.setItem("saved-books", newSavedBooks);
};

//Removes both a book's info and it's ArrayBuffer from the savedBooks on localforage.
export const removeSavedBook = async (
    toRemoveIndex: number,
    savedBooks: SavedBooks
) => {
    /*
    There's probably a better way to do this.
    Basically, you just need to find the index which you want to remove, and this function set both info and ArrayBuffer to null.
    e.g.:
    If we want to remove the lastBook (in this case, the last saved book), we just need to pass 0 as the toRemoveIndex.
    */
    const ls = localforage.createInstance({
        driver: localforage.INDEXEDDB,
    });
    let newSavedBooks: SavedBooks = {
        lastBook: toRemoveIndex === 0 ? null : savedBooks.lastBook,
        secondBook: toRemoveIndex === 1 ? null : savedBooks.secondBook,
        firstBook: toRemoveIndex === 2 ? null : savedBooks.firstBook,
        lastBookInfo: toRemoveIndex === 0 ? null : savedBooks.lastBookInfo,
        secondBookInfo: toRemoveIndex === 1 ? null : savedBooks.secondBookInfo,
        firstBookInfo: toRemoveIndex === 2 ? null : savedBooks.firstBookInfo,
    };
    await ls.setItem("saved-books", newSavedBooks);
};
// Use this to create a ordered array where the LAST saved book info is on index 0, and the FIRST is on index 2.
export const createBookInfoList = (savedBooks: SavedBooks) => {
    return [savedBooks.lastBook, savedBooks.secondBook, savedBooks.firstBook];
};
// Use this to create a ordered array where the LAST saved book ArrayBuffer is on index 0, and the FIRST is on index 2.
export const createArrayBufferList = (savedBooks: SavedBooks) => {
    return [
        savedBooks.lastBookInfo,
        savedBooks.secondBookInfo,
        savedBooks.firstBookInfo,
    ];
};
