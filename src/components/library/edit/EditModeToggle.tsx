import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React, { useContext, useState } from "react";
import { EditModeContext } from "../helpers/libraryContext";

export default function EditModeToggle() {
    const editModeContext = useContext(EditModeContext);

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
