import { MDBContainer, MDBSpinner } from "mdb-react-ui-kit";
import Break from "./components/general/Break";
import BlankLoadingSpinner from "./components/general/BlankLoadingSpinner";
import { useTranslation } from "react-i18next";

export default function Themeing() {
    const { t } = useTranslation();
    return (
        <div className="like-body bg-alt">
            <div className="d-flex flex-column align-items-center h-100 w-100 min-vh-100">
                <div className="ms-auto me-auto mt-auto mb-auto">
                    <p
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            fontSize: "2rem",
                            textAlign: "center",
                        }}
                    >
                        {t("general:carregandoTema")}
                    </p>
                </div>
            </div>
        </div>
    );
}
