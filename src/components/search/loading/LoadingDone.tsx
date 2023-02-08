import { MDBSpinner, MDBTypography } from "mdb-react-ui-kit";
import Break from "../../general/Break";
import { SyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function LoadingDone() {
    const [style, setStyle] = useState(
        "d-flex flex-wrap justify-content-center"
    );
    const { t } = useTranslation();

    useEffect(() => {
        setTimeout(() => {
            setStyle("d-none");
        }, 5000);
    });

    return (
        <div className={style}>
            <MDBTypography note noteColor="success">
                {t("search:tudoProntoBoaLeitura")}
            </MDBTypography>
            <Break />
        </div>
    );
}
