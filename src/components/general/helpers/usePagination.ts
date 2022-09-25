// Handles pagination states and functions.
import { Book } from "./generalTypes";
import { useRef } from "react";

export default function usePagination(
    itemsPerPage: number,
    handleClickCallback: (...args: any[]) => any
) {
    const allBooks = useRef<Book[] | undefined>(undefined);
}
