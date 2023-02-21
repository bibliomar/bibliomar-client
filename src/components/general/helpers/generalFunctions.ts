import { AuthContextParams, Metadata, LibraryCategories } from "./generalTypes";
import { NavigateFunction } from "react-router-dom";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
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
            navigate("/metadataList/error");
        }
        return null;
    }
};

// Tries to find a metadataList in the browser's saved books based on md5.
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

/**
 * Retrieves a metadataList from the user's library.
 * <br>
 * IMPORTANT: Exceptions throw by this function are propagated to the caller!
 * @param authContext - the authorization context
 * @param md5 - the md5 of the metadataList to retrieve
 */
export async function findBookInLibrary(
    authContext: AuthContextParams,
    md5: string
) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `${serverUrl}/library/${md5}`,
        headers: {
            Authorization: `Bearer ${authContext.jwtToken}`,
        },
    };

    return await axios.request(config);
}

/**
 * Removes a metadataList from the user's library.
 * <br>
 * IMPORTANT: Exceptions throw by this function are propagated to the caller!
 * @param authContext - the authorization context
 * @param md5ToRemove - the md5 of the metadataList to remove
 */
export async function removeBookFromLibrary(
    authContext: AuthContextParams,
    md5ToRemove: string
) {
    const config: AxiosRequestConfig = {
        method: "DELETE",
        url: `${serverUrl}/library/${md5ToRemove}`,
        headers: {
            Authorization: `Bearer ${authContext.jwtToken}`,
        },
    };

    return await axios.request(config);
}

/**
 * Adds a metadataList to the user's library.
 * <br>
 * IMPORTANT: Exceptions throw by this function are propagated to the caller!
 * @param authContext - the authorization context
 * @param bookToAdd - the metadataList to add
 * @param targetCategory - the target category
 */
export async function addBookToLibrary(
    authContext: AuthContextParams,
    bookToAdd: Metadata,
    targetCategory: LibraryCategories
): Promise<AxiosResponse> {
    const addBookRequest = {
        md5: bookToAdd.md5,
        topic: bookToAdd.topic,
        targetCategory: targetCategory,
    };

    const config: AxiosRequestConfig = {
        method: "POST",
        url: `${serverUrl}/library`,
        data: addBookRequest,
        headers: {
            Authorization: `Bearer ${authContext.jwtToken}`,
        },
    };

    return await axios.request(config);
}

export function getEmptyCover() {
    return "https://libgen.rocks/img/blank.png";
}

export function resolveCoverUrl(topic: string, coverUrl: string | undefined) {
    if (topic == undefined || coverUrl == undefined || coverUrl === "") {
        return undefined;
    }

    if (coverProviderUrl == undefined) {
        console.error("WARNING: Cover provider ENV variable is undefined!");
        return undefined;
    }

    if (topic === "fiction") {
        return `${coverProviderUrl}/fictioncovers/${coverUrl}`;
    } else {
        return `${coverProviderUrl}/covers/${coverUrl}`;
    }
}

export function getMetadataInfoPath(topic: string, md5: string) {
    if (topic == undefined || md5 == undefined) {
        return undefined;
    }

    const validtopics = ["fiction", "scitech", "sci-tech"];
    if (validtopics.includes(topic.toLowerCase())) {
        if (topic === "sci-tech") {
            topic = "scitech";
        }
        return `/metadata/${topic}/${md5}`;
    }

    return undefined;
}

export const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

export const serverUrl = import.meta.env.VITE_SERVER_URL as string;

export const manticoreUrl = import.meta.env.VITE_MANTICORE_URL as string;

export const coverProviderUrl = import.meta.env
    .VITE_COVER_PROVIDER_URL as string;

export const alternativeCoverProviderUrl = import.meta.env
    .VITE_ALTERNATIVE_COVER_PROVIDER_URL as string;
