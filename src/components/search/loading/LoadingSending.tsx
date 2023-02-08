import { MDBSpinner, MDBTypography } from "mdb-react-ui-kit";
import Break from "../../general/Break";
import { useTranslation } from "react-i18next";

export default function LoadingSending() {
    const { t } = useTranslation();
    return (
        <div className="d-flex flex-wrap justify-content-center">
            <MDBTypography note noteColor="primary">
                {t("search:estamosEnviandoSuaSolicitaoAoServidor")}
            </MDBTypography>
            <Break />
        </div>
    );
}
