import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import Break from "../../../general/Break";
import { ReaderNavbarProps } from "../../helpers/readerTypes";

export default function ReaderCustomizeModal({
    currentTheme,
    setCurrentTheme,
}: ReaderNavbarProps) {
    const [show, setShow] = useState<boolean>(false);

    const toggleShow = () => {
        setShow(!show);
    };

    return (
        <MDBModal show={show} setShow={setShow}>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle className="">
                            Alterar aparência do leitor
                        </MDBModalTitle>
                        <MDBBtn
                            className="btn-close btn-close-white"
                            color="none"
                            onClick={toggleShow}
                        ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody
                        tag="div"
                        className="d-flex flex-wrap justify-content-center"
                    ></MDBModalBody>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}
