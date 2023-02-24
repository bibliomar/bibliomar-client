import React, { useContext, useEffect, useState } from "react";
import {
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBNavbarItem,
} from "mdb-react-ui-kit";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../helpers/generalContext";
import { useTranslation } from "react-i18next";

export default function NavbarUser() {
    const { t } = useTranslation();
    const authContext = useContext(AuthContext);
    const location = useLocation();
    const logout = (evt: any) => {
        evt.preventDefault();
        authContext.setJwtToken(null);
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
                        <MDBDropdownItem
                            link
                            href={`/user/login?redirect=${location.pathname}`}
                        >
                            {t("navbar:user.signin")}
                        </MDBDropdownItem>
                    ) : (
                        <>
                            <MDBDropdownItem link href={`/user/login`}>
                                <i className="fas fa-book me-1"></i>
                                {t("navbar:user.library")}
                            </MDBDropdownItem>
                            <MDBDropdownItem
                                link
                                href="/user/logout"
                                onClick={logout}
                            >
                                <i className="fas fa-power-off me-1"></i>
                                {t("navbar:user.signoff")}
                            </MDBDropdownItem>
                        </>
                    )}
                </MDBDropdownMenu>
            </MDBDropdown>
        </MDBNavbarItem>
    );
}
