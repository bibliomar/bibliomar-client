import {
    MDBBadge,
    MDBBtn,
    MDBCollapse,
    MDBContainer,
    MDBIcon,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarNav,
} from "mdb-react-ui-kit";
import { Portal } from "react-portal";
import { ReaderNavbarProps } from "../helpers/readerTypes";
import ReaderCustomizeModal from "./customize/ReaderCustomizeModal";
import { useState } from "react";

export default function ReaderNavbar({
    readerSettings,
    setReaderSettings,
}: ReaderNavbarProps) {
    const [modalToggle, setModalToggle] = useState<boolean>(false);
    return (
        <div className="bg-black bg-opacity-25 w-100 h-100">
            <Portal node={document.getElementById("modal-root")}>
                <ReaderCustomizeModal
                    modalToggle={modalToggle}
                    setModalToggle={setModalToggle}
                    readerSettings={readerSettings}
                    setReaderSettings={setReaderSettings}
                />
            </Portal>
            <MDBNavbar expand dark>
                <MDBContainer fluid>
                    <MDBNavbarBrand className="ms-4" href="/reader">
                        Bibliomar
                        <MDBBadge
                            style={{ fontSize: "0.65em" }}
                            color="secondary"
                        >
                            Salvo
                        </MDBBadge>
                    </MDBNavbarBrand>

                    <MDBNavbarLink className="ms-auto">
                        <MDBBtn onClick={() => setModalToggle(true)}>
                            Aparência
                        </MDBBtn>
                    </MDBNavbarLink>
                </MDBContainer>
            </MDBNavbar>
        </div>
    );
}
