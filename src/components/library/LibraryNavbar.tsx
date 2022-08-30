import {
    MDBBtn,
    MDBIcon,
    MDBPopover,
    MDBPopoverBody,
    MDBPopoverHeader,
} from "mdb-react-ui-kit";
import React, { useContext } from "react";

interface Props {
    username: string;
}

// This component should have an edit button someday.
export default function ({ username }: Props) {
    return (
        <div className="basic-container p-3 w-100 mb-2 pt-4">
            <div className="d-flex flex-wrap mb-2 flex-grow-1 align-items-center">
                <div className="d-flex justify-content-start">
                    <div className="fw-bold">Sua biblioteca</div>
                </div>
                <div className="ms-auto">
                    <MDBPopover
                        size={"lg"}
                        btnChildren={
                            <>
                                <MDBIcon
                                    fas
                                    icon="filter"
                                    size={"lg"}
                                    className="me-2"
                                />
                            </>
                        }
                        btnClassName="btn-floating"
                        placement={"auto-start"}
                    >
                        <MDBPopoverHeader>Filtros</MDBPopoverHeader>
                        <MDBPopoverBody>Corpo</MDBPopoverBody>
                    </MDBPopover>
                </div>
            </div>
        </div>
    );
}
