import { MDBContainer, MDBTooltip } from "mdb-react-ui-kit";
import Navbar from "../general/navbar/Navbar";
import Footer from "../general/Footer";
import Break from "../general/Break";
import { useWindowSize } from "../general/helpers/useWindowSize";
import { useTranslation } from "react-i18next";

export default function About() {
    const { t } = useTranslation();
    const width = useWindowSize().width;
    return (
        <div className="like-body bg-alt">
            <MDBContainer fluid>
                <div className="row mb-5">
                    <div className="col mt-3">
                        <Navbar activeItem="about" />
                    </div>
                </div>
                <div className="basic-container" style={{ minHeight: "75vh" }}>
                    <div className="d-flex flex-wrap p-2 p-lg-3 justify-content-center mx-2">
                        <h3 className="mt-3 text-start simple-text-bolder">
                            {t("about:title")}
                        </h3>
                        <Break />
                        <div className="d-flex justify-content-center justify-content-lg-between flex-wrap">
                            <div className="about-first-text-container text-left mt-4 mt-lg-5 simple-text fs-5">
                                <h5>{t("about:first.header")}</h5>
                                <p>{t("about:first.p1")}</p>
                                <p>{t("about:first.p2")}</p>
                                <p className="mt-3">{t("about:first.p3")}</p>
                                <p className="mt-1">{t("about:first.p4")}</p>
                            </div>
                            <Break mobile />
                            <div className="about-first-img-container mt-5 mt-md-0">
                                <img
                                    className="img-fluid"
                                    alt={"Icone"}
                                    src="/assets/img/about1.svg"
                                />
                            </div>
                        </div>

                        <Break />

                        <div
                            className="d-flex flex-wrap w-100
                        justify-content-center mt-4 mt-lg-5 simple-text"
                        >
                            <div
                                className="about-first-img-container d-flex
                            flex-wrap justify-content-center justify-content-lg-start mb-5 mb-lg-0"
                            >
                                <h3 className="simple-text-bolder text-start mb-2 mb-lg-5 flex-grow-1">
                                    {t("about:second.header")}
                                </h3>
                                <Break className="mb-5" />
                                <img
                                    className={"img-fluid"}
                                    alt={"Icone 2"}
                                    src="/assets/img/about2.svg"
                                />
                            </div>
                            <Break mobile />
                            <div
                                className="row d-flex flex-column justify-content-center
                                about-first-text-container "
                            >
                                <div className="col col-lg-8 d-flex flex-wrap">
                                    <a
                                        className="mt-0 mt-lg-auto mb-3 mb-lg-0"
                                        href="https://discord.gg/J5FBbh8JbS"
                                        style={{ color: "unset" }}
                                    >
                                        <img
                                            alt={"Icone 4"}
                                            className="about-icon-img"
                                            src="/assets/img/discord.svg"
                                        />
                                    </a>

                                    <span>{t("about:second.p2")}</span>
                                </div>
                            </div>
                            <Break className="mb-4" />
                        </div>
                    </div>
                </div>
                <div className="mt-3 ">
                    <Footer />
                </div>
            </MDBContainer>
        </div>
    );
}
