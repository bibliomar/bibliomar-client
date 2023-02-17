import { createContext } from "react";
import {
    EditModeContextParams,
    FiltersContextParams,
    PossibleFilters,
} from "./libraryTypes";
import { defaultFilters } from "./libraryFunctions";

const EditModeContext = createContext<EditModeContextParams>({
    editMode: false,
    setEditMode: () => {},
    selectedBooksRef: { current: [] },
});

const Filters = createContext<FiltersContextParams>({
    filters: defaultFilters,
    setFilters: () => {},
});

export { EditModeContext, Filters };
