import { Book, LibraryCategories } from "../../general/helpers/generalTypes";
import { PossibleFilters } from "./libraryTypes";
import Fuse from "fuse.js";
import equal from "fast-deep-equal/es6";

export const defaultFilters: PossibleFilters = {
    format: "any",
    title: "",
    author: "",
};

/* This function is responsible for filtering the books based on the filterContext.
 *
 *
 * It should be run everytime a list of book is to be show to a user in the library. */
export function bookFiltering(books: Book[], filters: PossibleFilters): Book[] {
    if (equal(filters, defaultFilters)) {
        return books;
    }

    let resultSet: Book[] = [];

    if (filters.title !== "" || filters.authors !== "") {
        const fuseKey = filters.title !== "" ? ["title"] : ["authors"];
        const fuse = new Fuse(books, { keys: fuseKey });
        let searchResults: any[] = [];
        if (filters.title !== "") {
            const fuseSearch = fuse.search(filters.title);
            let fuseResults: any[] = [];
            fuseSearch.forEach((el) => {
                fuseResults.push(el.item);
            });

            searchResults = [...searchResults, ...fuseResults];
        }

        if (filters.author !== "") {
            const fuseSearch = fuse.search(filters.author);
            let fuseResults: any[] = [];
            fuseSearch.forEach((el) => {
                fuseResults.push(el.item);
            });

            searchResults = [...searchResults, ...fuseResults];
        }

        resultSet = searchResults;
    }

    if (filters.format !== "any") {
        resultSet = [
            ...resultSet,
            ...books.filter(
                (book) =>
                    book.extension &&
                    book.extension.toLowerCase() ===
                        filters.format?.toLowerCase()
            ),
        ];
    }

    return resultSet;
}

/* This function is responsible for adding the relevant category property on the books in a book list.
 *
 *
 * It should be run everytime a list of book is to be show to a user in the library. */
export function bookCategorySetter(
    books: Book[],
    bookCategory: LibraryCategories
) {
    return books.map((book) => {
        book.category = bookCategory;
        return book;
    });
}
