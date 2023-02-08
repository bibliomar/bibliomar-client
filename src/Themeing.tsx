import { MDBContainer, MDBSpinner } from "mdb-react-ui-kit";
import Break from "./components/general/Break";
import { useTranslation } from "react-i18next";

export default function Themeing() {
    const { t } = useTranslation();
    return (
        <div className="like-body bg-alt">
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
    );
}
