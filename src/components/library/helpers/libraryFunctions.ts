import { Book } from "../../general/helpers/generalTypes";
import { PossibleFilters } from "./libraryTypes";
import Fuse from "fuse.js";

export const defaultFilters: PossibleFilters = {
    format: undefined,
    isReading: false,
    title: undefined,
    authors: undefined,
};

export function bookFiltering(books: Book[], filters: PossibleFilters): Book[] {
    let resultSet: Book[] = [];

    if (filters.title || filters.authors) {
        let fuseKeys = [];
        if (filters.title) {
            fuseKeys.push(filters.title);
        }
        if (filters.authors) {
            fuseKeys.push(filters.authors);
        }

        const fuseOptions = {
            keys: fuseKeys,
        };

        const fuse = new Fuse(books, fuseOptions);
        let searchResults: any[] = [];
        if (filters.title) {
            searchResults = [...searchResults, ...fuse.search(filters.title)];
        }
        if (filters.authors) {
            searchResults = [...searchResults, ...fuse.search(filters.authors)];
        }

        resultSet = searchResults;
    }

    if (filters.isReading) {
        resultSet = [
            ...resultSet,
            ...books.filter(
                (book) =>
                    book.extension &&
                    book.extension.toLowerCase() === "epub" &&
                    book.progress
            ),
        ];
    }
    if (filters.format) {
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
