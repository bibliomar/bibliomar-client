import {
    MDBBtn,
    MDBCollapse,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarNav,
    MDBNavbarToggler,
} from "mdb-react-ui-kit";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import NavbarUser from "./NavbarUser";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../helpers/generalContext";
import { ThemeOptions } from "../helpers/generalTypes";
import BibliomarBrand from "./BibliomarBrand";
import NavbarThemeSelector from "./NavbarThemeSelector";
import { useWindowSize } from "../helpers/useWindowSize";
import NavbarLanguageSelector from "./NavbarLanguageSelector";
import { useTranslation } from "react-i18next";
import SmoothCollapse from "react-smooth-collapse";
import NavbarSearchBar from "./NavbarSearchBar";

interface Props {
    activeItem?: string;
    badgeText?: string;
}

export default function Navbar({ activeItem, badgeText }: Props) {
    const { t } = useTranslation();
    const themeContext = useContext(ThemeContext);
    const theme = themeContext.theme;
    const width = useWindowSize().width;
    const [showNav, setShowNav] = useState<boolean>(width > 992);
    const navigate = useNavigate();
    const location = useLocation();
    const formik = useFormik({
        initialValues: { query: "" },
        onSubmit: (values) => {
            navigate(`/search?category=any&q=${values.query}`);
        },
    });

    const handleNavigate = (evt: React.MouseEvent<HTMLAnchorElement>) => {
        evt.preventDefault();
        navigate(`${evt.currentTarget.name}`);
    };

    return (
        <div className="navbar-bg p-0">
            <MDBNavbar
                expand="lg"
                light={theme === ThemeOptions.light}
                dark={theme === ThemeOptions.dark}
                className={`p-2 pt-4 pb-4`}
            >
                <MDBContainer fluid>
                    <MDBNavbarBrand
                        href="/"
                        onClick={(evt) => {
                            evt.preventDefault();
                            navigate("/");
                        }}
                        style={{ maxWidth: "50%" }}
                    >
                        <BibliomarBrand badgeContent={badgeText} />
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label={t("navbar:toggleNavigation") as string}
                        onClick={() => setShowNav(!showNav)}
                    >
                        <MDBIcon icon="bars" fas />
                    </MDBNavbarToggler>
                    <SmoothCollapse
                        expanded={showNav || width > 992}
                        allowOverflowWhenOpen={true}
                        eagerRender
                        className="w-100"
                    >
                        <MDBNavbarNav
                            className={`mr-auto mb-2 mb-lg-0 ${
                                theme === ThemeOptions.light
                                    ? "text-dark"
                                    : "text-light"
                            } d-flex flex-column flex-lg-row justify-content-center justify-content-lg-start align-items-center`}
                        >
                            <MDBNavbarItem className="">
                                <MDBNavbarLink
                                    href="/library"
                                    name="/library"
                                    active={activeItem === "library"}
                                    onClick={handleNavigate}
                                >
                                    {t("navbar:library")}
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink
                                    href="/explore"
                                    name="/explore"
                                    active={activeItem === "explore"}
                                    onClick={handleNavigate}
                                >
                                    {t("navbar:explorar")}
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink
                                    active={activeItem === "reader"}
                                    href="/reader"
                                    name="/reader"
                                    onClick={handleNavigate}
                                >
                                    {t("navbar:reader")}
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            {location.pathname !== "/search" ? (
                                <NavbarSearchBar />
                            ) : null}
                            <div className="d-flex flex-nowrap ms-0 ms-lg-auto mt-3 mt-lg-0 me-2">
                                <NavbarLanguageSelector />
                                <NavbarThemeSelector />
                                <NavbarUser />
                            </div>
                        </MDBNavbarNav>
                    </SmoothCollapse>
                </MDBContainer>
            </MDBNavbar>
        </div>
    );
}
