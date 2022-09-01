import React, { SetStateAction } from "react";
import { Book } from "../../general/helpers/generalTypes";

export interface PossibleFilters {
    [key: string]: string | boolean;
    title: string;
    authors: string;
    isReading: boolean;
    format: string;
}

export interface EditModeContext {
    editMode: boolean;
    setEditMode: React.Dispatch<SetStateAction<boolean>>;
}

export interface SelectedBooksContext {
    selectedBooks: Book[];
    setSelectedBooks: React.Dispatch<SetStateAction<Book[]>>;
}

export interface FiltersContext {
    filters: PossibleFilters;
    setFilters: React.Dispatch<SetStateAction<PossibleFilters>>;
}
