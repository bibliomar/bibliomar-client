import { MDBSpinner, MDBTypography } from "mdb-react-ui-kit";
import Break from "../../general/Break";
import { SyntheticEvent, useEffect, useState } from "react";

export default function LoadingDone() {
    const [style, setStyle] = useState(
        "d-flex flex-wrap justify-content-center"
    );

    useEffect(() => {
        setTimeout(() => {
            setStyle("d-none");
        }, 5000);
    });

    return (
        <div className={style}>
            <MDBTypography note noteColor="success">
                Tudo pronto! Boa leitura.
            </MDBTypography>
            <Break />
        </div>
    );
}
