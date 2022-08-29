import { Book, UserLibrary } from "./generalTypes";
import { NavigateFunction } from "react-router-dom";
import React from "react";
import axios from "axios";

const getOnlineCover = async (md5: string) => {
    let reqUrl = `${backendUrl}/v1/cover/${md5}`;
    let request;
    try {
        request = await axios.get(reqUrl);
        sessionStorage.setItem(`${md5}-cover`, request?.data);
        return request?.data;
    } catch (e: any) {
        // 500 errors means Biblioterra couldn't find a cover.
        return null;
    }
};

// Retrieves a book's cover from cache or online, returns a TimeoutID, so it can be removed when the component un-mounts.
export const getCover = async (
    md5: string,
    setCover: React.Dispatch<React.SetStateAction<string>>,
    setCoverDone?: React.Dispatch<React.SetStateAction<boolean>>,
    timeout?: number
) => {
    let possibleCachedCover = sessionStorage.getItem(`${md5}-cover`) as string;
    if (possibleCachedCover) {
        setCoverDone ? setCoverDone(true) : null;
        setCover(possibleCachedCover);
        return undefined;
    } else {
        const coverTimeout: number = setTimeout(
            async () => {
                const onlineCover = await getOnlineCover(md5);
                if (onlineCover == null) {
                    setCoverDone ? setCoverDone(true) : null;
                    return;
                }
                setCover(onlineCover);
                setCoverDone ? setCoverDone(true) : null;
            },
            timeout ? timeout : 0
        );
        return coverTimeout;
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

export const backendUrl = import.meta.env.VITE_BACKEND_URL as string;
