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
import ThemeChooser from "./ThemeChooser";
import { useWindowSize } from "../helpers/useWindowSize";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

interface Props {
    activeItem?: string;
    badgeText?: string;
}

export default function Navbar({ activeItem, badgeText }: Props) {
    const { t } = useTranslation();
    const themeContext = useContext(ThemeContext);
    const theme = themeContext.theme;
    const width = useWindowSize().width;
    const [showNav, setShowNav] = useState<boolean>(false);
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

                    <MDBCollapse navbar show={showNav}>
                        <MDBNavbarNav
                            className={`mr-auto mb-2 mb-lg-0 ${
                                theme === ThemeOptions.light
                                    ? "text-dark"
                                    : "text-light"
                            }`}
                        >
                            <MDBNavbarItem className="mt-2 mt-md-0">
                                <MDBNavbarLink
                                    name="/about"
                                    active={activeItem === "about"}
                                    href="/about"
                                    onClick={handleNavigate}
                                >
                                    {t("navbar:about")}
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
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
                                    active={activeItem === "reader"}
                                    href="/reader"
                                    name="/reader"
                                    onClick={handleNavigate}
                                >
                                    {t("navbar:reader")}
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            {location.pathname !== "/search" ? (
                                <form
                                    onSubmit={formik.handleSubmit}
                                    className="d-flex input-group justify-content-center
                                        justify-content-lg-end me-0 me-lg-5 mt-3 mt-lg-0"
                                    style={{ maxWidth: "100%" }}
                                >
                                    <MDBInput
                                        name="query"
                                        id="query"
                                        type="search"
                                        wrapperClass={
                                            width <= 1024 ? "w-75" : undefined
                                        }
                                        value={formik.values.query}
                                        onChange={formik.handleChange}
                                    />
                                    <MDBBtn
                                        className={
                                            width <= 1024 ? "w-25" : undefined
                                        }
                                        color="primary"
                                        type="submit"
                                    >
                                        <i className="fas fa-search"></i>
                                    </MDBBtn>
                                </form>
                            ) : null}
                            <LanguageSelector />
                            <ThemeChooser />
                            <NavbarUser />
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </div>
    );
}
