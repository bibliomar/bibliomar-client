import { MDBContainer } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="navbar-bg footer-container w-100 d-flex flex-column justify-content-center mt-5">
            <div className="d-flex align-content-center w-100 h-100">
                <Link to={"/about"} className="ms-5  me-4">
                    <span className={"basic-text"}>Sobre</span>
                </Link>
                <Link to={"/faq"} className="">
                    <span className={"basic-text"}>FAQ</span>
                </Link>
                <Link to={"/"} className="ms-auto me-4">
                    <img
                        src={"/assets/img/discord-footer-logo.svg"}
                        alt={"Discord logo"}
                    />
                </Link>
                <Link to={"/"} className="me-5">
                    <img
                        src={"/assets/img/github-footer-logo.svg"}
                        alt={"Discord logo"}
                    />
                </Link>
            </div>
        </div>
    );
}
