// This file exports common functions used by components in /reader.

import { Book } from "../../../helpers/generalTypes";
import localforage from "localforage";
import { SavedBooks, ThemeColors } from "./readerTypes";
import axios, { AxiosRequestConfig } from "axios";
import { ReactReaderStyle } from "react-reader";

// Saves a new or replaces an existing SavedBooks object in localforage.INDEXEDDB.
//
// It will then be used in everything associated with /reader.
export const saveBooks = async (arrayBuffer: ArrayBuffer, bookInfo: Book) => {
    const ls = localforage.createInstance({
        driver: localforage.INDEXEDDB,
    });

    let newSavedBooks: SavedBooks;

    const savedBooksCache: SavedBooks | null = await ls.getItem("saved-books");
    if (savedBooksCache) {
        /* The first book is going to be deleted, so we are removing it's pagination info to save space.
        This should only be uncommented after #12 is resolved.
        if (savedBooksCache.firstBookInfo) {
            localStorage.removeItem(
                `${savedBooksCache.firstBookInfo.title}-page`
            );
        }
         */

        newSavedBooks = {
            firstBook: {
                arrayBuffer: arrayBuffer,
                bookInfo: bookInfo,
            },
            secondBook: savedBooksCache.firstBook,
            thirdBook: savedBooksCache.secondBook,
        };
    } else {
        newSavedBooks = {
            firstBook: {
                arrayBuffer: arrayBuffer,
                bookInfo: bookInfo,
            },
            secondBook: undefined,
            thirdBook: undefined,
        };
    }
    await ls.setItem("saved-books", newSavedBooks);
};

// Updates a book in localForage, this is mainly used to keep track of a book's progress when it wasn't
// being tracked before.
// Can also be used to update a arrayBuffer, if the need ever arises.
// Should only be used if savedBooks exists and the index of the book you want to update is know.
export const updateBook = async (
    bookInfo: Book,
    toUpdateIndex: number,
    arrayBuffer?: ArrayBuffer | undefined
) => {
    const ls = localforage.createInstance({
        driver: localforage.INDEXEDDB,
    });
    const savedBooksCache: SavedBooks | null = await ls.getItem("saved-books");
    if (savedBooksCache) {
        // That's... quite the code.
        const updatedSavedBooks: SavedBooks = {
            firstBook:
                toUpdateIndex === 0 && savedBooksCache.firstBook
                    ? {
                          bookInfo: bookInfo,
                          arrayBuffer: arrayBuffer
                              ? arrayBuffer
                              : savedBooksCache.firstBook.arrayBuffer,
                      }
                    : null,
            secondBook:
                toUpdateIndex === 1 && savedBooksCache.secondBook
                    ? {
                          bookInfo: bookInfo,
                          arrayBuffer: arrayBuffer
                              ? arrayBuffer
                              : savedBooksCache.secondBook.arrayBuffer,
                      }
                    : null,
            thirdBook:
                toUpdateIndex === 2 && savedBooksCache.thirdBook
                    ? {
                          bookInfo: bookInfo,
                          arrayBuffer: arrayBuffer
                              ? arrayBuffer
                              : savedBooksCache.thirdBook.arrayBuffer,
                      }
                    : null,
        };
        await ls.setItem("saved-books", updatedSavedBooks);
    } else {
        return;
    }
};

//Removes both a book's info and it's ArrayBuffer from the savedBooks on localforage.
export const removeSavedBook = async (toRemoveIndex: number) => {
    /*
    There's probably a better way to do this.
    Basically, you just need to find the index which you want to remove, and this function set both info and ArrayBuffer to null.
    e.g.:
    If we want to remove the lastBook (in this case, the last saved book), we just need to pass 0 as the toRemoveIndex.
    */
    const ls = localforage.createInstance({
        driver: localforage.INDEXEDDB,
    });
    const savedBooksCache: SavedBooks | null = await ls.getItem("saved-books");
    let newSavedBooks: SavedBooks | undefined = undefined;
    if (savedBooksCache) {
        const updatedSavedBooks: SavedBooks = {
            firstBook: toRemoveIndex === 0 ? null : savedBooksCache.firstBook,
            secondBook: toRemoveIndex === 1 ? null : savedBooksCache.secondBook,
            thirdBook: toRemoveIndex === 2 ? null : savedBooksCache.secondBook,
        };
        await ls.setItem("saved-books", updatedSavedBooks);
    } else {
        return;
    }

    await ls.setItem("saved-books", newSavedBooks);
};

/*
This function will remove any book with the same md5 as the specified one
(preferably there should be only one at maximum.) and then re-add it
in the new category.
We are basically re-adding a book with new progress info. It's a simple request,
so it shouldn't be costly network-wise.

Check Biblioterra docs.
 */
export const saveProgressOnDatabase = async (
    category: string,
    currentProgress: string,
    book: Book
) => {
    const jwtToken = localStorage.getItem("jwt-token");
    if (jwtToken == null) {
        return null;
    }
    book.progress = currentProgress;
    const reqBody = [book];

    const config: AxiosRequestConfig = {
        url: `https://biblioterra.herokuapp.com/v1/library/add/${category}`,
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
        method: "POST",
        timeout: 20000,
        data: reqBody,
    };
    try {
        await axios.request(config);
        return 200;
    } catch (e: any) {
        if (e.response) {
            if (e.response.status === 401) {
                return null;
            }
        }
        console.error(e);
    }
};

interface ThemeColorsObject {
    //First item is equivalent to "color" property, and second is to "backgroundColor".
    //The third element is the theme's name.
    default: ThemeColors;
    dark: ThemeColors;
    amoled: ThemeColors;
    easily: ThemeColors;
}

export const themeColorsObject: ThemeColorsObject = {
    default: ["#000", "#fff", "default"],
    dark: ["#fff", "rgba(0,0,0,0.75)", "dark"],
    amoled: ["#fff", "#000", "amoled"],
    easily: ["#d8f3fd", "#33373e", "easily"],
};

export const registerRenditionThemes = (rendition: any) => {
    rendition.themes.registerThemes({
        default: {
            body: {
                color: "#000",
                background: "#fff",
            },
        },
        dark: {
            body: {
                color: "#fff",
                background: "rgba(0,0,0,0.75)",
            },
        },
        amoled: {
            body: {
                color: "#fff",
                background: "#000",
            },
        },
        huemintEasily: {
            body: {
                color: "#d8f3fd",
                background: "#33373e",
            },
        },
    });
};

export const createReactReaderStyle = (
    themeColors: ThemeColors
): ReactReaderStyle => {
    return {
        tocButtonBarBottom: {},
        container: {
            overflow: "hidden",
            height: "100%",
        },

        readerArea: {
            position: "relative",
            zIndex: 1,
            height: "100%",
            width: "100%",
            backgroundColor: themeColors[1],
            transition: "all .3s ease",
        },
        containerExpanded: {
            transform: "translateX(256px)",
        },
        titleArea: {
            position: "absolute",
            top: "20px",
            left: "50px",
            right: "50px",
            textAlign: "center",
            color: themeColors[0],
        },
        reader: {
            position: "absolute",
            top: "50px",
            left: "50px",
            bottom: "20px",
            right: "50px",
        },
        swipeWrapper: {
            position: "absolute",
            top: "0",
            left: "0",
            bottom: "0",
            right: "0",
            zIndex: "50",
        },
        prev: {
            left: "1",
        },
        next: {
            right: "1",
        },
        arrow: {
            outline: "none",
            border: "none",
            background: "none",
            position: "absolute",
            top: "50%",
            marginTop: "-32",
            fontSize: "62",
            padding: "0 10px",
            color: themeColors[0],
            fontFamily: "arial, sans-serif",
            cursor: "pointer",
            userSelect: "none",
            appearance: "none",
            fontWeight: "normal",
        },
        arrowHover: {
            color: "#777",
        },
        tocBackground: {
            position: "absolute",
            left: "256",
            top: 0,
            bottom: 0,
            right: 0,
            zIndex: 1,
        },
        tocArea: {
            position: "absolute",
            left: "0",
            top: "0",
            bottom: "0",
            zIndex: "0",
            width: "256",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            background: "#f2f2f2",
            padding: "10px 0",
        },
        tocAreaButton: {
            userSelect: "none",
            appearance: "none",
            background: "none",
            border: "none",
            display: "block",
            fontFamily: "sans-serif",
            width: "100%",
            fontSize: ".9em",
            textAlign: "left",
            padding: ".9em 1em",
            borderBottom: "1px solid #ddd",
            color: "#aaa",
            boxSizing: "border-box",
            outline: "none",
            cursor: "pointer",
        },
        tocButton: {
            background: "none",
            border: "none",
            width: "32",
            height: "32",
            position: "absolute",
            top: "10",
            left: "10",
            borderRadius: "2",
            outline: "none",
            cursor: "pointer",
        },
        tocButtonExpanded: {
            background: "#f2f2f2",
        },
        tocButtonBar: {
            position: "absolute",
            width: "60%",
            background: "#ccc",
            height: "2",
            left: "50%",
            margin: "-1px -30%",
            top: "50%",
            transition: "all .5s ease",
        },
        tocButtonBarTop: {
            top: "35%",
        },

        loadingView: {
            position: "absolute",
            top: "50%",
            left: "10%",
            right: "10%",
            color: "#ccc",
            textAlign: "center",
            marginTop: "-.5em",
        },
    };
};
