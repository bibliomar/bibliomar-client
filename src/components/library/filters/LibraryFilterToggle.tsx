import {
    MDBIcon,
    MDBPopover,
    MDBPopoverBody,
    MDBPopoverHeader,
} from "mdb-react-ui-kit";
import LibraryFilters from "./LibraryFilters";
import React from "react";

export default function LibraryFilterToggle() {
    return (
        <MDBPopover
            size={"lg"}
            btnChildren={
                <>
                    <MDBIcon fas icon="filter" size={"lg"} className="me-2" />
                </>
            }
            color={"none"}
            btnClassName="btn-floating btn-outline-primary"
            placement={"auto-start"}
        >
            <MDBPopoverHeader>Filtros</MDBPopoverHeader>
            <MDBPopoverBody>
                <LibraryFilters />
            </MDBPopoverBody>
        </MDBPopover>
    );
}
