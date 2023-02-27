import { useOutletContext } from "react-router-dom";
import LibraryExpandedCategory from "./LibraryExpandedCategory";
import Break from "../general/Break";
import LibraryNavbar from "./LibraryNavbar";
import React, { useContext, useMemo } from "react";
import {
    LibraryCategories,
    UserLibrary,
} from "../general/helpers/generalTypes";
import {
    bookFiltering,
    defaultFilters,
    UserLibraryContext,
} from "./helpers/libraryFunctions";
import equal from "fast-deep-equal/es6";
import { Filters } from "./helpers/libraryContext";

interface Props {
    title: string;
    metadataCategory: LibraryCategories;
}

export default function ({ title, metadataCategory }: Props) {
    const filtersContext = useContext(Filters);
    const userLibraryContext = useContext(UserLibraryContext);
    const userLibrary = userLibraryContext.userLibrary;
    const metadatas = Object.values(userLibrary[metadataCategory]);
    const onDefaultFilters = useMemo(() => {
        return equal(filtersContext.filters, defaultFilters);
    }, [metadatas, filtersContext.filters]);

    const filteredMetadatadas = useMemo(() => {
        return bookFiltering(metadatas, filtersContext.filters);
    }, [metadatas, filtersContext.filters]);

    return (
        <div className="d-flex flex-wrap justify-content-start justify-content-md-center mt-5 w-100">
            <LibraryNavbar />
            <Break />
            <LibraryExpandedCategory
                title={title}
                totalCategoryLength={metadatas.length}
                filteredMetadatas={filteredMetadatadas}
                onDefaultFilters={onDefaultFilters}
            />
        </div>
    );
}
