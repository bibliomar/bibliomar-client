import React from "react";
import { MDBIcon } from "mdb-react-ui-kit";

interface Props {
    labelText: string;
    labelFor: string;
    labelClassName?: string;
}

export default function LibraryFiltersLabel({
    labelText,
    labelFor,
    labelClassName,
}: Props) {
    return (
        <label
            htmlFor={labelFor}
            className={`${labelClassName ? labelClassName : "fw-bold mb-2"}`}
            style={{ fontSize: "1.3em" }}
        >
            {labelText}
        </label>
    );
}
