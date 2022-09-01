import { Link } from "react-router-dom";
import { useWindowSize } from "./helpers/useWindowSize";

export default function Footer() {
    const width = useWindowSize().width;

    return (
        <div className="navbar-bg footer-container w-100 d-flex flex-column justify-content-center mt-5">
            <div className="d-flex align-content-center w-100 h-100">
                <div>
                    <Link
                        to={"/about"}
                        className="ms-4 me-4"
                        style={{ color: "unset", fontSize: "1.15rem" }}
                    >
                        <span className={"basic-text"}>Sobre</span>
                    </Link>
                    <Link
                        to={"/faq"}
                        className="me-4 me-md-0"
                        style={{ color: "unset", fontSize: "1.15rem" }}
                    >
                        <span className={"basic-text"}>FAQ</span>
                    </Link>
                </div>
                {width > 768 && (
                    <span className="ms-auto me-auto">
                        <strong>Bibliomar</strong> - Genuinamente brasileiro.
                    </span>
                )}

                <Link
                    to={"/"}
                    className="ms-auto ms-md-0 me-4"
                    style={{ color: "unset" }}
                >
                    <img
                        src={"/assets/img/discord-footer-logo.svg"}
                        alt={"Discord logo"}
                    />
                </Link>
                <Link to={"/"} className="me-3" style={{ color: "unset" }}>
                    <img
                        src={"/assets/img/github-footer-logo.svg"}
                        alt={"Discord logo"}
                    />
                </Link>
            </div>
        </div>
    );
}
