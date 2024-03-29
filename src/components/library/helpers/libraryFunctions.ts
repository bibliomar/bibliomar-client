import {
    LibraryCategories,
    Metadata,
    UserLibrary,
} from "../../general/helpers/generalTypes";
import { PossibleFilters, UserLibraryContextParams } from "./libraryTypes";
import Fuse from "fuse.js";
import equal from "fast-deep-equal/es6";
import React from "react";

export const defaultFilters: PossibleFilters = {
    format: "any",
    title: "",
    author: "",
};

/* This function is responsible for filtering the books based on the filterContext.
 *
 *
 * It should be run everytime a list of metadataList is to be show to a user in the library. */
export function bookFiltering(
    books: Metadata[],
    filters: PossibleFilters
): Metadata[] {
    if (equal(filters, defaultFilters)) {
        return books;
    }

    let resultSet: Metadata[] = [];

    if (filters.title !== "" || filters.authors !== "") {
        const fuseKey = filters.title !== "" ? ["title"] : ["authors"];
        const fuse = new Fuse(books, { keys: fuseKey });
        let searchResults: any[] = [];
        if (filters.title !== "") {
            const fuseSearch = fuse.search(filters.title);
            const fuseResults: any[] = [];
            fuseSearch.forEach((el) => {
                fuseResults.push(el.item);
            });

            searchResults = [...searchResults, ...fuseResults];
        }

        if (filters.author !== "") {
            const fuseSearch = fuse.search(filters.author);
            const fuseResults: any[] = [];
            fuseSearch.forEach((el) => {
                fuseResults.push(el.item);
            });

            searchResults = [...searchResults, ...fuseResults];
        }

        resultSet = searchResults;
    }

    if (filters.format != null && filters.format !== "any") {
        if (resultSet.length === 0) {
            resultSet = [...books];
        }
        resultSet = resultSet.filter(
            (book) =>
                book.extension &&
                book.extension.toLowerCase() === filters.format.toLowerCase()
        );
    }

    return resultSet;
}

/* This function is responsible for adding the relevant category property on the books in a metadataList list.
 *
 *
 * It should be run everytime a list of metadataList is to be show to a user in the library. */
export function bookCategorySetter(
    books: Metadata[],
    bookCategory: LibraryCategories
) {
    return books.map((book) => {
        book.category = bookCategory;
        return book;
    });
}

const placeholderUserLibrary: UserLibrary = {
    backlog: {},
    dropped: {},
    finished: {},
    reading: {},
    toRead: {},
    username: "",
    pagesRead: 0,
};
export const UserLibraryContext = React.createContext<UserLibraryContextParams>(
    {
        userLibrary: placeholderUserLibrary,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        updateUserLibrary: () => {},
    }
);

export function calculateNumOfBooks(userLibrary: UserLibrary) {
    let numOfBooks = 0;
    Object.values(userLibrary).forEach((category) => {
        if (category === userLibrary.username) return;

        const categoryValues = Object.values(category);
        if (Array.isArray(categoryValues)) {
            numOfBooks += categoryValues.length;
        }
    });
    return numOfBooks;
}

export function buildMonthsList(): Date[] {
    const months = [];

    const currentDate = new Date();
    const monthsOffset = 11;
    const startMonth = currentDate.getMonth() - monthsOffset;
    for (let i = startMonth; i <= currentDate.getMonth(); i++) {
        if (i === currentDate.getMonth()) {
            months.push(currentDate);
        } else {
            months.push(new Date(currentDate.getFullYear(), i, 1));
        }
    }
    return months;
}
