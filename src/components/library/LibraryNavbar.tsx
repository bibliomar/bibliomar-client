import React, { useContext, useState } from "react";
import LibraryFilterToggle from "./filters/LibraryFilterToggle";
import EditModeToggle from "./edit/EditModeToggle";
import { EditModeContext } from "./helpers/libraryContext";
import EditModeMove from "./edit/EditModeMove";
import EditModeRemove from "./edit/EditModeRemove";
import { Trans, useTranslation } from "react-i18next";
import {
    calculateNumOfBooks,
    UserLibraryContext,
} from "./helpers/libraryFunctions";
import LibraryStatisticsToggle from "./statistics/LibraryStatisticsToggle";
import Break from "../general/Break";

// This component should have an edit button someday.
export default function () {
    const userLibraryContext = useContext(UserLibraryContext);
    const editModeContext = useContext(EditModeContext);
    const editModeActive = editModeContext && editModeContext.editMode;
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
                            <div className="d-flex flex-wrap">
                                <span className="text-muted">
                                    <Trans
                                        i18nKey="umaColeoDeLivros"
                                        ns="library"
                                        values={{
                                            numOfBooks: numOfBooks,
                                        }}
                                        components={{
                                            s: <strong />,
                                        }}
                                    />
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="d-flex flex-wrap mb-2 w-75 justify-content-end align-items-center">
                    <div
                        id="library-navbar-toggle-buttons"
                        className="d-flex ms-3 me-2"
                    >
                        <div className={""}>
                            <EditModeToggle />
                        </div>

                        <div className={"ms-2 me-0"}>
                            <LibraryFilterToggle />
                        </div>

                        <div className={"ms-2"}>
                            <LibraryStatisticsToggle />
                        </div>
                    </div>

                    <Break />

                    {editModeActive ? (
                        <div
                            id="library-navbar-action-buttons"
                            className="d-flex ms-3 me-2 mt-2"
                        >
                            <div className="">
                                <EditModeMove />
                            </div>
                            <div className={"ms-2"}>
                                <EditModeRemove />
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
