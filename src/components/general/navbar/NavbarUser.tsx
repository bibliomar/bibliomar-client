import React, { useContext, useEffect, useState } from "react";
import {
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBNavbarItem,
} from "mdb-react-ui-kit";
import { useLocation } from "react-router-dom";
import { Auth } from "../helpers/generalContext";

export default function NavbarUser() {
    const authContext = useContext(Auth);
    const location = useLocation();
    const logout = (evt: any) => {
        evt.preventDefault();
        localStorage.removeItem("jwt-token");
        authContext.setUserLogged(!!localStorage.getItem("jwt-token"));
    };

    return (
        <MDBNavbarItem className="ms-auto ms-lg-0 mt-3 mt-lg-0">
            <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link">
                    {authContext.userLogged ? (
                        <i className="fas fa-user-cog fa-lg" />
                    ) : (
                        <i className="fas fa-user fa-lg" />
                    )}
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                    {!authContext.userLogged ? (
                        <MDBDropdownItem>
                            <MDBDropdownLink
                                href={`/user/login?redirect=${location.pathname}`}
                            >
                                Entrar
                            </MDBDropdownLink>
                        </MDBDropdownItem>
                    ) : (
                        <MDBDropdownItem>
                            <MDBDropdownLink href={`/user/login`}>
                                <i className="fas fa-book me-1"></i>
                                Minha Biblioteca
                            </MDBDropdownLink>
                            <MDBDropdownLink
                                href="/user/logout"
                                onClick={logout}
                            >
                                <i className="fas fa-power-off me-1"></i>
                                Deslogar
                            </MDBDropdownLink>
                        </MDBDropdownItem>
                    )}
                </MDBDropdownMenu>
            </MDBDropdown>
        </MDBNavbarItem>
    );
}
