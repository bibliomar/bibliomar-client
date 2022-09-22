import {
    MDBIcon,
    MDBPopover,
    MDBPopoverBody,
    MDBPopoverHeader,
} from "mdb-react-ui-kit";
import LibraryFilters from "./LibraryFilters";
import React, { useState } from "react";
import { useToggle } from "../../general/helpers/useToggle";

export default function LibraryFilterToggle() {
    const [active, toggleActive] = useToggle(false);

    return (
        <MDBPopover
            size={"lg"}
            btnChildren={
                <MDBIcon fas icon="filter" size={"lg"} className="me-2" />
            }
            color={active ? "primary" : "none"}
            onClick={() => {
                toggleActive();
            }}
            btnClassName={`btn-floating ${
                active ? null : "btn-outline-primary"
            }`}
            placement={"auto-start"}
            poperStyle={{ zIndex: "200000" }}
        >
            <MDBPopoverHeader>Filtros</MDBPopoverHeader>
            <MDBPopoverBody>
                <LibraryFilters />
            </MDBPopoverBody>
        </MDBPopover>
    );
}
