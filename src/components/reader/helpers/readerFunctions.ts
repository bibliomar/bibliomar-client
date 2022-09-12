// This file exports common functions used by components in /reader or related to its functionality.

import { Book } from "../../general/helpers/generalTypes";
import localforage from "localforage";
import {
    FlowOptions,
    ManagerOptions,
    ReaderSettings,
    ReaderThemeAccentOptions,
    ReaderThemeColors,
    ReaderThemeOptions,
    SavedBooks,
} from "./readerTypes";
import axios, { AxiosRequestConfig } from "axios";
import { ReactReaderStyle } from "react-reader";
import { backendUrl } from "../../general/helpers/generalFunctions";

// Saves a new or replaces an existing SavedBooks object in localforage.INDEXEDDB.
//
// It will then be used in everything associated with /reader.
export const saveBookLocally = async (
    arrayBuffer: ArrayBuffer,
    bookInfo: Book
) => {
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
            secondBook: null,
            thirdBook: null,
        };
    }
    await ls.setItem("saved-books", newSavedBooks);
};

// Updates a book in localForage, this is mainly used to keep track of a book's progress when it wasn't
// being tracked before.
// Can also be used to update a arrayBuffer, if the need ever arises.
// Should only be used if savedBooks exists and the index of the book you want to update is know.
export const updateBookLocally = async (
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
                    : savedBooksCache.firstBook,
            secondBook:
                toUpdateIndex === 1 && savedBooksCache.secondBook
                    ? {
                          bookInfo: bookInfo,
                          arrayBuffer: arrayBuffer
                              ? arrayBuffer
                              : savedBooksCache.secondBook.arrayBuffer,
                      }
                    : savedBooksCache.secondBook,
            thirdBook:
                toUpdateIndex === 2 && savedBooksCache.thirdBook
                    ? {
                          bookInfo: bookInfo,
                          arrayBuffer: arrayBuffer
                              ? arrayBuffer
                              : savedBooksCache.thirdBook.arrayBuffer,
                      }
                    : savedBooksCache.thirdBook,
        };
        await ls.setItem("saved-books", updatedSavedBooks);
    } else {
        return;
    }
};

//Removes both a book's info and it's ArrayBuffer from the savedBooks on localforage.
export const removeBookLocally = async (toRemoveIndex: number) => {
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
Returns an index of a savedBook if it matches the md5 specified.
Returns null if there's no SavedBooks object or no matches.
This function should be used everytime something is to be added to SavedBooks, to avoid duplicates.
This index should be used in local books related functions.
 */

export const findBookLocally = async (md5: string): Promise<number | null> => {
    const ls = localforage.createInstance({
        driver: localforage.INDEXEDDB,
    });
    const savedBooksCache: SavedBooks | null = await ls.getItem("saved-books");
    if (savedBooksCache != null) {
        let savedBookIndex: number | null = null;
        const savedBooksValuesArray = Object.values(savedBooksCache);
        savedBooksValuesArray.forEach((el, i) => {
            if (el && el.bookInfo.md5 === md5) {
                savedBookIndex = i;
            }
        });
        return savedBookIndex;
    } else {
        return null;
    }
};

/**
This function will remove any book with the same md5 as the specified one
(preferably there should be only one at maximum.) and then re-add it
in the new category.
We are basically re-adding a book with new progress info. It's a simple request,
so it shouldn't be costly network-wise.
 Check Biblioterra docs.
@return null if not logged / book has invalid category.
 */
export const saveProgressOnDatabase = async (
    currentProgress: string,
    book: Book
) => {
    const jwtToken = localStorage.getItem("jwt-token");
    if (jwtToken == null || book.category == null) {
        return null;
    }
    book.progress = currentProgress;
    const reqBody = [book];

    const config: AxiosRequestConfig = {
        url: `${backendUrl}/v1/library/add/${book.category}`,
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
        method: "POST",
        timeout: 20000,
        data: reqBody,
    };
    try {
        await axios.request(config);
        return true;
    } catch (e: any) {
        console.error(e);
        return false;
    }
};

// Below are functions used only in the actual reader screen

interface ThemeColorsModel {
    // This is the model of the tuples describing a reader theme.
    //First item is equivalent to "color" property, and second is to "backgroundColor".
    //The third element is the theme's accent (light or dark).
    //The last element is the theme's name.
    [key: string]: ReaderThemeColors;
}

// These themes will be used by the outter part of the reader.
// They must match the inner part for obvious reasons.
// Be sure to also set on ReaderThemeOptions enum.
export const themeColorsObject: ThemeColorsModel = {
    default: ["#000", "#fff", "light", "default"],
    dark: ["#FFF", "#252525", "dark", "dark"],
    amoled: ["#fff", "#000", "dark", "amoled"],
    paste: ["#231f1f", "#dbd0bf", "light", "paste"],
    mono: ["#343532", "#f2efea", "light", "mono"],
};

// This will automatically register all themes on themeColorsObject as valid Rendition themes.
// Rendition themes cover the inner part of the reader.
// Be sure to keep the outter reader theme in sync.
// Use readerSettings values to define font styles.
export const registerRenditionThemes = (
    rendition: any,
    fontName: string,
    fontWeight: number,
    fontSize: number
) => {
    Object.values(themeColorsObject).forEach((theme) => {
        console.log(theme);
        rendition.themes.register(theme[3], {
            "*": {
                color: `${theme[0]} !important`,
                backgroundColor: `${theme[1]} !important`,
            },

            p: {
                "font-family": fontName ? fontName : "Nunito Sans, sans-serif",
                "font-weight": fontWeight ? `${fontWeight}` : "600",
                "font-size": fontSize ? `${fontSize}px` : "20px",
                "line-height":
                    fontName === "Nunito Sans, sans-serif" ? "27px" : "unset",
                "text-align": "justify",
            },
        });
    });
};

export const createReactReaderStyle = (
    themeName: ReaderThemeOptions
): ReactReaderStyle => {
    /*
    Index 1 equals to backgroundColor.
    Index 0 equals to text color.
     */

    return {
        tocButtonBarBottom: {
            top: "66%",
        },
        container: {
            overflow: "hidden",
            height: "100%",
        },

        readerArea: {
            fontFamily: "Nunito Sans",
            position: "relative",
            zIndex: 1,
            height: "100%",
            width: "100%",
            backgroundColor: themeColorsObject[themeName][1],
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
            color: themeColorsObject[themeName][0],
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
            color: themeColorsObject[themeName][0],
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
            background: themeColorsObject[themeName][1],
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
            fontSize: "1.1em",
            textAlign: "left",
            padding: ".9em 1em",
            borderBottom: "1px solid #ddd",
            color: themeColorsObject[themeName][0],
            boxSizing: "border-box",
            outline: "none",
            cursor: "pointer",
        },
        tocButton: {
            background: "none",
            border: "none",
            width: "32px",
            height: "62px",
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
            background: themeColorsObject[themeName][0],
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

// This defines the accent used by the navbar.
// Should be called inside the navbar or in relevant components.
export const chooseThemeAccent = (themeName: ReaderThemeOptions) => {
    if (themeColorsObject[themeName][2] === ReaderThemeAccentOptions.light) {
        return ReaderThemeAccentOptions.light;
    } else {
        return ReaderThemeAccentOptions.dark;
    }
};

// Always call this when changing the reader flow.
// Weird stuff will happen otherwise.
export const managerBasedOnFlow = (flow: FlowOptions) => {
    return flow === FlowOptions.default || flow === FlowOptions.paginated
        ? ManagerOptions.default
        : ManagerOptions.continuous;
};

// Use these settings as base when changing reader settings.
export const defaultReaderSettings: ReaderSettings = {
    flow: FlowOptions.paginated,
    fullscreen: false,
    manager: managerBasedOnFlow(FlowOptions.paginated),
    swipe: false,
    themeName: ReaderThemeOptions.dark,
    fontFamily: "Helvetica, sans-serif",
    fontWeight: 400,
    fontSize: 16,
};
