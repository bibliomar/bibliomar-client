import { createContext } from "react";
import { FiltersContext, PossibleFilters } from "./libraryTypes";
import { defaultFilters } from "./libraryFunctions";

const EditMode = createContext<boolean>(false);
const Filters = createContext<FiltersContext>({
    filters: defaultFilters,
    setFilters: () => {},
});

// How will filtering work??
/*
  - leitura iniciada
  - de formato
  - titulo
 */

export { EditMode, Filters };
