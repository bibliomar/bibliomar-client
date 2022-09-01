import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React, { useContext, useState } from "react";
import { EditMode, SelectedBooks } from "../helpers/libraryContext";

export default function EditModeToggle() {
    const editModeContext = useContext(EditMode);
    const selectedBooksContext = useContext(SelectedBooks);

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
                    selectedBooksContext.selectedBooks &&
                    selectedBooksContext.selectedBooks.length > 0
                ) {
                    selectedBooksContext.setSelectedBooks([]);
                }
                editModeContext.setEditMode((prevEditMode) => !prevEditMode);
            }}
        >
            <MDBIcon far icon="edit" size={"lg"} />
        </MDBBtn>
    );
}
