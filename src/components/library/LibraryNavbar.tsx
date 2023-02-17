import React, { SetStateAction, useContext, useState } from "react";
import LibraryFilterToggle from "./filters/LibraryFilterToggle";
import EditModeToggle from "./edit/EditModeToggle";
import { EditModeContext } from "./helpers/libraryContext";
import EditModeMove from "./edit/EditModeMove";
import EditModeRemove from "./edit/EditModeRemove";
import {
    LibraryCategories,
    UserLibrary,
} from "../general/helpers/generalTypes";
import { useTranslation } from "react-i18next";
import { UserLibraryContext } from "./helpers/libraryFunctions";

function calculateNumOfBooks(userLibrary: UserLibrary) {
    let numOfBooks = 0;
    Object.values(userLibrary).forEach((category) => {
        if (category === userLibrary.username) return;

        const categoryValues = Object.values(category);
        if (Array.isArray(categoryValues)) {
            numOfBooks += categoryValues.length;
        }
    });
    return numOfBooks;
}

// This component should have an edit button someday.
export default function () {
    const userLibraryContext = useContext(UserLibraryContext);
    const editModeContext = useContext(EditModeContext);
    const [actionLoading, setActionLoading] = useState<boolean>(false);
    const numOfBooks = calculateNumOfBooks(userLibraryContext.userLibrary);
    const { t } = useTranslation();
    return (
        <div className="basic-container p-3 w-100 mb-2 pt-4">
            <div className="d-flex flex-wrap mb-2 flex-grow-1 align-items-center">
                <div className="d-flex justify-content-start w-25">
                    <div>
                        <span className="fw-bold">
                            {t("library:suaBiblioteca")}
                        </span>
                        <br />
                        {numOfBooks > 0 && (
                            <span className="text-muted">
                                Uma coleção de <strong>{numOfBooks}</strong>{" "}
                                livros.
                            </span>
                        )}
                    </div>
                </div>
                <div className="d-flex flex-wrap mb-2 w-75 align-items-center">
                    {editModeContext && editModeContext.editMode ? (
                        <>
                            <div className="ms-auto">
                                <EditModeMove />
                            </div>
                            <div className={"ms-3"}>
                                <EditModeRemove />
                            </div>
                        </>
                    ) : null}

                    <div
                        className={
                            !editModeContext.editMode ? "ms-auto" : "ms-3"
                        }
                    >
                        <EditModeToggle />
                    </div>
                    <div className={"ms-3 me-2"}>
                        <LibraryFilterToggle />
                    </div>
                </div>
            </div>
        </div>
    );
}
