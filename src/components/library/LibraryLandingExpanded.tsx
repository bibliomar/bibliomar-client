import { useOutletContext } from "react-router-dom";
import LibraryExpandedCategory from "./LibraryExpandedCategory";
import Break from "../general/Break";
import LibraryNavbar from "./LibraryNavbar";
import React, { useContext } from "react";
import {
    LibraryCategories,
    UserLibrary,
} from "../general/helpers/generalTypes";
import { UserLibraryContext } from "./helpers/libraryFunctions";

interface Props {
    title: string;
    metadataCategory: LibraryCategories;
}

export default function ({ title, metadataCategory }: Props) {
    const userLibraryContext = useContext(UserLibraryContext);
    const userLibrary = userLibraryContext.userLibrary;
    console.log(title, metadataCategory);
    return (
        <div className="d-flex flex-wrap justify-content-start justify-content-md-center mt-5 w-100">
            <LibraryNavbar />
            <Break />
            <LibraryExpandedCategory
                title={title}
                metadataCategory={metadataCategory}
                metadatas={Object.values(userLibrary[metadataCategory])}
            />
        </div>
    );
}
