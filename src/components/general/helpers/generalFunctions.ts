import { Book, LibraryCategories, UserLibrary } from "./generalTypes";
import { NavigateFunction } from "react-router-dom";
import React from "react";
import axios from "axios";

// This is mainly used in the useCover hook.
export const getOnlineCover = async (
    md5: string
): Promise<string | undefined> => {
    let reqUrl = `${backendUrl}/v1/cover/${md5}`;
    try {
        const request = await axios.get(reqUrl);
        const result: string = request.data;
        if (result.includes("blank")) {
            return undefined;
        }
        return result;
    } catch (e: any) {
        // 500 errors means Biblioterra couldn't find a cover.
        return undefined;
    }
};

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

// A shorthand function that calls getUserInfo and tries to find a book based on md5.
// Automatically uses stored jwt-token, if it exists.
export const findBookInLibrary = async (md5: string) => {
    const jwtToken = localStorage.getItem("jwt-token");
    if (jwtToken == null) {
        return null;
    }
    const userInfo: UserLibrary | null = await getUserInfo(jwtToken);
    let foundBook: Book | null = null;
    if (userInfo == null) {
        return null;
    }
    // This will iterate over all values in bookList, which are 3 lists, in every list, iterates over every entry checking
    // for it's md5.
    Object.values(userInfo).forEach((bookList: Book[]) => {
        bookList.forEach((book: Book) => {
            if (book.md5 === md5) {
                foundBook = book;
            }
        });
    });

    return foundBook as Book | null;
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

// @ts-ignore
export const backendUrl = import.meta.env.VITE_BACKEND_URL as string;
