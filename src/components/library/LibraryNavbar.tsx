import { MDBBtn } from "mdb-react-ui-kit";
import React, { useContext } from "react";
import { EditModeContext } from "./utils/RelevantContext";

interface Props {
    setEditMode: any;
    username: string;
}

export default function ({ setEditMode, username }: Props) {
    const editMode = useContext(EditModeContext);
    return (
        <div className="bg-black rounded-3 bg-opacity-50 text-light p-3 library-section-div mb-2 pt-4">
            <div className="d-flex flex-wrap mb-2">
                <div className="d-flex justify-content-start flex-grow-1">
                    <div className="fw-bold">
                        Biblioteca de <br />
                        <span className="text-secondary lead">{username}</span>
                    </div>
                </div>

                <div className="d-flex justify-content-end me-3">
                    <MDBBtn
                        onClick={() => setEditMode(!editMode)}
                        style={{ height: "2.5rem" }}
                        className="align-self-center"
                    >
                        {editMode ? "Sair" : "Editar"}
                    </MDBBtn>
                </div>
            </div>
        </div>
    );
}
