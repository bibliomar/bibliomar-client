import { Book, LibraryCategories } from "./generalTypes";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import localforage from "localforage";
import { SavedBookEntry, SavedBooks } from "../../reader/helpers/readerTypes";
import { SearchFormFields } from "../../search/helpers/searchTypes";

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
        const req = await axios.request(config);
        const data = req.data;
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
    const md5List = [];

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

export function resolveCoverUrl(
    alternative: boolean,
    topic: string,
    coverUrl: string
) {
    if (topic == undefined || coverUrl == undefined) {
        return undefined;
    }

    let coverProvider = "";
    if (alternative) {
        if (alternativeCoverProviderUrl == undefined) {
            return undefined;
        }
        coverProvider = alternativeCoverProviderUrl;
    } else {
        if (coverProviderUrl == undefined) {
            return undefined;
        }
        coverProvider = coverProviderUrl;
    }

    if (topic === "fiction") {
        return `${coverProvider}/fictioncovers/${coverUrl}`;
    } else {
        return `${coverProvider}/covers/${coverUrl}`;
    }
}

export function getBookInfoPath(topic: string, md5: string) {
    if (topic == undefined || md5 == undefined) {
        return undefined;
    }

    const validtopics = ["fiction", "scitech", "sci-tech"];
    if (validtopics.includes(topic.toLowerCase())) {
        if (topic === "sci-tech") {
            topic = "scitech";
        }
        return `/book/${topic}/${md5}`;
    }

    return undefined;
}

export function buildSearchObject(
    values: SearchFormFields,
    offset?: number | undefined,
    limit?: number | undefined
): object {
    const topic = values.topic;
    const type = values.type;
    const query = values.q;
    const format = values.format;
    const language = values.language;
    const fulltext = values.fulltext;

    // PS: Field order is VERY important here.
    // The user query should be at the start of the string, and everything else at the end.
    let finalQueryString = "";

    if (type != null) {
        switch (type) {
            case "title":
                if (finalQueryString.includes("@title")) {
                    finalQueryString.replace("@title", `@title ${query}`);
                } else {
                    finalQueryString += `@title ${query} `;
                }
                break;
            case "author":
                if (finalQueryString.includes("@author")) {
                    finalQueryString.replace("@author", `@author ${query}`);
                } else {
                    finalQueryString += `@author ${query} `;
                }
                break;
            case "any":
                finalQueryString += `${query} `;
                break;
        }
    }

    if (format != null && format !== "any") {
        if (finalQueryString.includes("@extension")) {
            finalQueryString.replace("@extension", `@extension ${format} `);
        } else {
            finalQueryString += `@extension ${format} `;
        }
    }
    if (language != null && language !== "any") {
        if (finalQueryString.includes("@language")) {
            finalQueryString.replace("@language", `@language ${language} `);
        } else {
            finalQueryString += `@language ${language} `;
        }
    }

    if (topic === "fiction") {
        finalQueryString += "@topic fiction ";
    } else if (topic === "scitech") {
        finalQueryString += "@topic scitech ";
    }

    if (fulltext != null && query) {
        finalQueryString = query;
    }

    finalQueryString = finalQueryString.trim();

    const searchObject: any = {
        index: "libgen",
        query: {
            query_string: finalQueryString,
        },
    };

    if (offset != null) {
        searchObject.offset = offset;
    } else {
        searchObject.offset = 0;
    }

    if (limit != null) {
        searchObject.limit = limit;
    } else {
        searchObject.limit = 500;
    }

    if (limit != null && offset != null) {
        const maxMatches = offset + limit > 1000 ? 1000 : offset + limit;
        searchObject.max_matches = maxMatches;
    }

    console.log(searchObject);

    return searchObject;
}

export const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

export const manticoreUrl = import.meta.env.VITE_MANTICORE_URL as string;

export const coverProviderUrl = import.meta.env
    .VITE_COVER_PROVIDER_URL as string;

export const alternativeCoverProviderUrl = import.meta.env
    .VITE_ALTERNATIVE_COVER_PROVIDER_URL as string;
