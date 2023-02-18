import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React, { useContext, useEffect, useState } from "react";
import { EditModeContext } from "../helpers/libraryContext";
import { UserLibraryContext } from "../helpers/libraryFunctions";

export default function EditModeToggle() {
    const userLibraryContext = useContext(UserLibraryContext);
    const editModeContext = useContext(EditModeContext);

    const toggleEditMode = () => {
        if (
            editModeContext.selectedBooksRef.current &&
            editModeContext.selectedBooksRef.current.length > 0
        ) {
            editModeContext.selectedBooksRef.current = [];
        }
        editModeContext.setEditMode((prevEditMode) => !prevEditMode);
    };

    useEffect(() => {
        if (editModeContext.editMode) {
            toggleEditMode();
        }
    }, [userLibraryContext.userLibrary]);

    return (
        <MDBBtn
            size={"lg"}
            type={"button"}
            color={editModeContext.editMode ? "primary" : "none"}
            className={`btn-floating ${
                !editModeContext.editMode ? "btn-outline-primary" : undefined
            }`}
            onClick={() => {
                if (
                    editModeContext.selectedBooksRef.current &&
                    editModeContext.selectedBooksRef.current.length > 0
                ) {
                    editModeContext.selectedBooksRef.current = [];
                }
                editModeContext.setEditMode((prevEditMode) => !prevEditMode);
            }}
        >
            <MDBIcon far icon="edit" size={"lg"} />
        </MDBBtn>
    );
}
