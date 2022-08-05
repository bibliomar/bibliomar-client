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
import { useContext, useState } from "react";
import { useFormik } from "formik";
import NavbarUser from "./NavbarUser";
import { useLocation, useNavigate } from "react-router-dom";
import { Theme } from "../helpers/generalContext";
import { ThemeOptions } from "../helpers/generalTypes";
import BibliomarBrand from "./BibliomarBrand";
import ThemeChooser from "./ThemeChooser";

interface Props {
    activeItem?: string;
    setIsUserLoggedContext?: any;
    badgeText?: string;
}

export default function Navbar({
    activeItem,
    setIsUserLoggedContext,
    badgeText,
}: Props) {
    const themeContext = useContext(Theme);
    const theme = themeContext.theme;
    const [showNav, setShowNav] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const formik = useFormik({
        initialValues: { query: "", category: "any" },
        onSubmit: (values) => {
            navigate(`/search?category=${values.category}&q=${values.query}`);
        },
    });

    return (
        <div className="navbar-bg">
            <MDBNavbar
                expand="lg"
                light={theme === ThemeOptions.light}
                dark={theme === ThemeOptions.dark}
                className="p-2 pt-4 pb-4"
            >
                <MDBContainer fluid>
                    <MDBNavbarBrand href="/search">
                        <BibliomarBrand badgeText={badgeText} />
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={() => setShowNav(!showNav)}
                    >
                        <MDBIcon icon="bars" fas />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar show={showNav}>
                        <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                            <MDBNavbarItem>
                                <MDBNavbarLink
                                    active={activeItem === "home"}
                                    href="/search"
                                >
                                    Sobre
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink
                                    active={activeItem === "library"}
                                    href="/user/login"
                                >
                                    Biblioteca
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink
                                    active={activeItem === "reader"}
                                    href="/reader"
                                >
                                    Leitor
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            {location.pathname !== "/search" ? (
                                <>
                                    <form
                                        onSubmit={formik.handleSubmit}
                                        className="d-flex input-group justify-content-end me-5 mt-3 mt-lg-0"
                                    >
                                        <MDBInput
                                            name="query"
                                            id="query"
                                            type="search"
                                            value={formik.values.query}
                                            onChange={formik.handleChange}
                                            className="text-light"
                                        />
                                        <MDBBtn color="primary" type="submit">
                                            Pesquisar
                                        </MDBBtn>
                                    </form>
                                </>
                            ) : null}
                            <ThemeChooser />
                            <NavbarUser
                                setIsUserLoggedContext={setIsUserLoggedContext}
                            />
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </div>
    );
}
