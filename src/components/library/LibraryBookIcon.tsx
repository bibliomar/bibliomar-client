import { MDBCheckbox, MDBIcon } from "mdb-react-ui-kit";
import React, { useContext, useState } from "react";
import { EditModeContext } from "./utils/RelevantContext";
import { Book } from "../../helpers/generalTypes";

interface Props {
    checked: boolean;
}

export default function ({ checked }: Props) {
    const editMode = useContext(EditModeContext);
    return editMode ? (
        <MDBCheckbox
            className="position-absolute ms-1 mt-1"
            style={{ zIndex: "5" }}
            checked={checked}
            readOnly
        />
    ) : (
        <MDBIcon
            fas
            icon="info-circle"
            className="position-absolute ms-1 mt-1"
            style={{ zIndex: "5" }}
        />
    );
}
