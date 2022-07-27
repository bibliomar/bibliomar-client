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
import { useState } from "react";
import { useFormik } from "formik";
import NavbarUser from "./NavbarUser";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
    activeItem?: string;
    setIsUserLoggedContext?: any;
}

/**
 * @summary - The default navbar used in all of Bibliomar.
 * @param activeItem -
 * @param setIsUserLoggedContext -
 */
export default function Navbar({ activeItem, setIsUserLoggedContext }: Props) {
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
        <div className="bg-black bg-opacity-25">
            <MDBNavbar expand="lg" dark>
                <MDBContainer fluid>
                    <MDBNavbarBrand href="/search">Bibliomar</MDBNavbarBrand>
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
                                    Inicio
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
