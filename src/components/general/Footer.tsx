import { MDBContainer } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="navbar-bg footer-container w-100 d-flex flex-column justify-content-center mt-5">
            <div className="d-flex align-content-center w-100 h-100">
                <Link
                    to={"/about"}
                    className="ms-5  me-4"
                    style={{ color: "unset", fontSize: "1.15rem" }}
                >
                    <span className={"basic-text"}>Sobre</span>
                </Link>
                <Link
                    to={"/faq"}
                    className=""
                    style={{ color: "unset", fontSize: "1.15rem" }}
                >
                    <span className={"basic-text"}>FAQ</span>
                </Link>
                <span className="ms-auto me-auto">
                    <strong>Bibliomar</strong> - Genuinamente brasileiro.
                </span>
                <Link
                    to={"/"}
                    className="me-4"
                    style={{ color: "unset" }}
                >
                    <img
                        src={"/assets/img/discord-footer-logo.svg"}
                        alt={"Discord logo"}
                    />
                </Link>
                <Link to={"/"} className="me-5" style={{ color: "unset" }}>
                    <img
                        src={"/assets/img/github-footer-logo.svg"}
                        alt={"Discord logo"}
                    />
                </Link>
            </div>
        </div>
    );
}
