// Handles pagination states and functions.
import { Metadata } from "../../general/helpers/generalTypes";
import { useRef } from "react";

export default function usePagination(
    itemsPerPage: number,
    handleClickCallback: (...args: any[]) => any
) {
    const allBooks = useRef<Metadata[] | undefined>(undefined);
}
