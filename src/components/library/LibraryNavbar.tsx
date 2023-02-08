import React, { SetStateAction, useContext, useState } from "react";
import LibraryFilterToggle from "./filters/LibraryFilterToggle";
import EditModeToggle from "./edit/EditModeToggle";
import { EditMode } from "./helpers/libraryContext";
import EditModeMove from "./edit/EditModeMove";
import EditModeRemove from "./edit/EditModeRemove";
import { UserLibrary } from "../general/helpers/generalTypes";
import { useTranslation } from "react-i18next";

interface Props {
    userLibrary: UserLibrary;
    username: string;
}

export interface EditModeSubProps {
    actionLoading: boolean;
    setActionLoading: React.Dispatch<SetStateAction<boolean>>;
}

// This component should have an edit button someday.
export default function ({ username, userLibrary }: Props) {
    const editModeContext = useContext(EditMode);
    const [actionLoading, setActionLoading] = useState<boolean>(false);
    const numOfBooks =
        userLibrary.reading.length +
        userLibrary["to-read"].length +
        userLibrary.backlog.length;
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
                                <EditModeMove
                                    actionLoading={actionLoading}
                                    setActionLoading={setActionLoading}
                                />
                            </div>
                            <div className={"ms-3"}>
                                <EditModeRemove
                                    actionLoading={actionLoading}
                                    setActionLoading={setActionLoading}
                                />
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
