import { Link } from "react-router-dom";
import { useWindowSize } from "./helpers/useWindowSize";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const width = useWindowSize().width;
    const { t } = useTranslation();

    return (
        <div className="navbar-bg footer-container w-100 d-flex flex-column justify-content-center mt-auto">
            <div className="d-flex align-content-center w-100 h-100">
                <div>
                    <Link
                        to={"/about"}
                        className="ms-4 me-4"
                        style={{ color: "unset", fontSize: "1.15rem" }}
                    >
                        <span className={"simple-text-bolder"}>
                            {t("general:sobre")}
                        </span>
                    </Link>
                    <Link
                        to={"/faq"}
                        className="me-4 me-md-0"
                        style={{ color: "unset", fontSize: "1.15rem" }}
                    >
                        <span className={"simple-text-bolder"}>FAQ</span>
                    </Link>
                </div>
                {width >= 768 && (
                    <span className="ms-auto me-auto">
                        <strong>Bibliomar</strong> - {t("general:genuinely")}.
                    </span>
                )}

                <a
                    href={"https://discord.gg/J5FBbh8JbS"}
                    className="ms-auto ms-md-0 me-4"
                    style={{ color: "unset" }}
                >
                    <img
                        src={"/assets/img/footer-discord-logo.svg"}
                        alt={"Discord logo"}
                    />
                </a>
                <a
                    href={"https://github.com/Lamarcke/bibliomar-react"}
                    className="me-3"
                    style={{ color: "unset" }}
                >
                    <img
                        src={"/assets/img/footer-github-logo.svg"}
                        alt={"Discord logo"}
                    />
                </a>
            </div>
        </div>
    );
}
