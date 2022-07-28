import {
    MDBBtn,
    MDBCollapse,
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarNav,
} from "mdb-react-ui-kit";
import { Portal } from "react-portal";
import { ReaderNavbarProps } from "../helpers/readerTypes";
import ReaderCustomizeModal from "./customize/ReaderCustomizeModal";

export default function ReaderNavbar({
    currentTheme,
    setCurrentTheme,
}: ReaderNavbarProps) {
    return (
        <div className="bg-black bg-opacity-25 w-100 h-100">
            <Portal node={document.getElementById("modal-root")}>
                <ReaderCustomizeModal
                    currentTheme={currentTheme}
                    setCurrentTheme={setCurrentTheme}
                />
            </Portal>
            <MDBNavbar expand dark>
                <MDBContainer fluid>
                    <MDBNavbarBrand className="ms-4" href="/reader">
                        Bibliomar
                    </MDBNavbarBrand>
                    <MDBCollapse show>
                        <MDBNavbarNav>
                            <MDBNavbarItem>
                                <MDBNavbarLink className="me-4">
                                    <MDBBtn>Aparência</MDBBtn>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </div>
    );
}
