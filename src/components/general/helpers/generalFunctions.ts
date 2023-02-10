import { Book, LibraryCategories } from "./generalTypes";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import localforage from "localforage";
import { SavedBookEntry, SavedBooks } from "../../reader/helpers/readerTypes";

export const hasStorage = (storage: Storage): boolean => {
    const testItem = "_bibliomar_storage_test";
    try {
        storage.setItem(testItem, "parangole");
        storage.getItem(testItem);
        storage.removeItem(testItem);
        return true;
    } catch (e: any) {
        return false;
    }
};

// Exerpt from SO:
// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
export function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

// Retrieves the books in a user's library.
export const getUserInfo = async (
    jwtToken: string,
    navigate?: NavigateFunction
) => {
    const config = {
        url: `${backendUrl}/v1/library/get`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    };
    try {
        let req = await axios.request(config);
        let data = req.data;
        return {
            reading: data["reading"].reverse(),
            "to-read": data["to-read"].reverse(),
            backlog: data["backlog"].reverse(),
        };
    } catch (e: any) {
        if (e.request) {
            if (e.request.status === 401) {
                localStorage.removeItem("jwt-token");
                if (navigate) {
                    navigate("/user/login");
                }
            }
        }
        if (navigate) {
            navigate("/book/error");
        }
        return null;
    }
};

// Tries to find a book in the browser's saved books based on md5.
export const findBookInSavedBooks = async (
    md5: string
): Promise<SavedBookEntry | null> => {
    try {
        const lf = localforage.createInstance({
            driver: localforage.INDEXEDDB,
        });
        const savedBooks: SavedBooks | null =
            await lf.getItem<SavedBooks | null>("saved-books");
        if (savedBooks != null) {
            let possibleSavedBook: SavedBookEntry | null = null;
            Object.values(savedBooks).forEach((savedBook) => {
                if (savedBook && savedBook.bookInfo) {
                    if (savedBook.bookInfo.md5 === md5) {
                        possibleSavedBook = savedBook;
                    }
                }
            });
            return possibleSavedBook;
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
};

// Tries to find a book on a user's library based on md5.
// Automatically uses stored jwt-token, if it exists.
export const findBookInLibrary = async (md5: string) => {
    const jwtToken = localStorage.getItem("jwt-token");
    if (jwtToken == null) {
        return null;
    }

    try {
        const req = await axios.get(`${backendUrl}/v1/library/get/${md5}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        const data: {
            result: Book;
        } = req.data;
        return data.result;
    } catch (err: any) {
        console.error(err);
        return null;
    }
};

export async function removeBookFromLibrary(
    bookToRemove: Book | Book[],
    jwtToken: string
) {
    let md5List = [];

    if (Array.isArray(bookToRemove)) {
        bookToRemove.forEach((book) => md5List.push(book.md5));
    } else {
        md5List.push(bookToRemove.md5);
    }

    const config = {
        url: `${backendUrl}/v1/library/remove`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
        data: md5List,
    };
    const req = await axios.request(config);
    console.log(req);
}

export async function addBookToLibrary(
    bookToAdd: Book | Book[],
    jwtToken: string,
    category: LibraryCategories
) {
    if (Array.isArray(bookToAdd)) {
        bookToAdd = bookToAdd.map((book) => {
            if (Object.hasOwn(book, "category")) {
                book.category = category;
            }
            return book;
        });
    } else {
        if (Object.hasOwn(bookToAdd, "category")) {
            bookToAdd.category = category;
        }
    }

    const req_body = Array.isArray(bookToAdd) ? bookToAdd : [bookToAdd];
    const config = {
        url: `${backendUrl}/v1/library/add/${category}`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
        data: req_body,
    };
    const req = await axios.request(config);
    console.log(req);
}

export function getEmptyCover() {
    return "https://libgen.rocks/img/blank.png";
}

export function resolveCoverUrl(topic: string, coverUrl: string) {
    if (topic === "fiction") {
        return `${coverProviderUrl}/fictioncovers/${coverUrl}`;
    } else {
        return `${coverProviderUrl}/covers/${coverUrl}`;
    }
}

// @ts-ignore
export const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

// @ts-ignore
export const manticoreUrl = import.meta.env.VITE_MANTICORE_URL as string;

// @ts-ignore
export const onProduction = import.meta.env.VITE_ON_PRODUCTION as string;

export const coverProviderUrl = import.meta.env
    .VITE_COVER_PROVIDER_URL as string;
