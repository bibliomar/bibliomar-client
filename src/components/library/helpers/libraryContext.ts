import { createContext } from "react";
import {
    EditModeContextParams,
    FiltersContextParams,
    PossibleFilters,
} from "./libraryTypes";
import { defaultFilters } from "./libraryFunctions";

const EditModeContext = createContext<EditModeContextParams>({
    editMode: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setEditMode: () => {},
    selectedBooksRef: { current: [] },
});

const Filters = createContext<FiltersContextParams>({
    filters: defaultFilters,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setFilters: () => {},
});

export { EditModeContext, Filters };
