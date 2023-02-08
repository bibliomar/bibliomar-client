import { MDBTypography } from "mdb-react-ui-kit";
import Break from "../general/Break";
import { useTranslation } from "react-i18next";

export default function BookInfoError() {
    const { t } = useTranslation();
    return (
        <>
            <div className="d-flex flex-wrap justify-content-center text-dark">
                <MDBTypography
                    className="fw-bold mb-3"
                    tag="div"
                    note
                    noteColor="info"
                >
                    <span>{t("bookinfo:errorText1")}</span>
                </MDBTypography>
                <Break />
                <MDBTypography
                    className="fw-bold mb-3"
                    tag="div"
                    note
                    noteColor="info"
                >
                    <span>{t("bookinfo:errorText2")}</span>
                </MDBTypography>
            </div>
        </>
    );
}
