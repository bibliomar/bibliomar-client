import React, { useEffect, useState } from "react";
import {
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBNavbarItem,
} from "mdb-react-ui-kit";
import { useLocation } from "react-router-dom";

interface Props {
    setIsUserLoggedContext?: any;
}

export default function NavbarUser(props: Props) {
    const [userLogged, setUserLogged] = useState<boolean>(false);
    const location = useLocation();
    const logout = (evt: any) => {
        evt.preventDefault();
        localStorage.removeItem("jwt-token");
        setUserLogged(false);
        if (props.setIsUserLoggedContext) {
            props.setIsUserLoggedContext(false);
        }
    };

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwt-token");
        if (jwtToken) {
            setUserLogged(true);
            if (props.setIsUserLoggedContext) {
                props.setIsUserLoggedContext(true);
            }
        }
    }, []);

    return (
        <MDBNavbarItem className="d-flex ms-auto mt-3 mt-lg-0">
            <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link">
                    {userLogged ? (
                        <i className="fas fa-user-cog fa-lg" />
                    ) : (
                        <i className="fas fa-user fa-lg" />
                    )}
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                    {!userLogged ? (
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
