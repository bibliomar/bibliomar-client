import Navbar from "./navbar/Navbar";
import Message from "./Message";
import Break from "./Break";
import { useTranslation } from "react-i18next";

export default function Error404() {
    const { t } = useTranslation();
    return (
        <div className="like-body bg-alt">
            <div className="container">
                <Navbar />

                <div className="row mt-5">
                    <div
                        className="col d-flex flex-wrap justify-content-center fw-bold"
                        style={{ width: "80vw" }}
                    >
                        <Break />
                        <p className="note note-danger lead mt-5 fw-bold">
                            {t(
                                "general:noEncontramosOContedoQueVocEstProcurandoQueTalTent"
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
