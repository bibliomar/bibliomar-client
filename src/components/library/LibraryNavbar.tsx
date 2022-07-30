import { MDBBtn } from "mdb-react-ui-kit";
import React, { useContext } from "react";

interface Props {
    username: string;
}

// This component should have an edit button someday.
export default function ({ username }: Props) {
    return (
        <div className="bg-black rounded-3 bg-opacity-50 text-light p-3 library-section-div mb-2 pt-4">
            <div className="d-flex flex-wrap mb-2">
                <div className="d-flex justify-content-start flex-grow-1">
                    <div className="fw-bold">
                        Biblioteca de <br />
                        <span className="text-secondary lead">{username}</span>
                    </div>
                </div>

                <div className="d-flex justify-content-end me-3"></div>
            </div>
        </div>
    );
}
