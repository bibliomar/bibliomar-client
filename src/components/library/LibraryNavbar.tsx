import { MDBBtn } from "mdb-react-ui-kit";
import React, { useContext } from "react";

interface Props {
    username: string;
}

// This component should have an edit button someday.
export default function ({ username }: Props) {
    return (
        <div className="basic-container p-3 w-100 mb-2 pt-4">
            <div className="d-flex flex-wrap mb-2">
                <div className="d-flex justify-content-start flex-grow-1">
                    <div className="fw-bold">Sua biblioteca</div>
                </div>
            </div>
        </div>
    );
}
