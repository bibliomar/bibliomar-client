import { createContext } from "react";
import {
    EditModeContext,
    FiltersContext,
    PossibleFilters,
    SelectedBooksContext,
} from "./libraryTypes";
import { defaultFilters } from "./libraryFunctions";

const EditMode = createContext<EditModeContext>({
    editMode: false,
    setEditMode: () => {},
});

// Must only be used when EditMode is enabled.
const SelectedBooks = createContext<SelectedBooksContext>({
    selectedBooks: [],
    setSelectedBooks: () => {},
});

const Filters = createContext<FiltersContext>({
    filters: defaultFilters,
    setFilters: () => {},
});

export { EditMode, SelectedBooks, Filters };
