import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import Break from "../../../general/Break";
import { ReaderNavbarProps } from "../../helpers/readerTypes";

export default function ReaderCustomizeModal({
    readerSettings,
    setReaderSettings,
    modalToggle,
    setModalToggle,
}: ReaderNavbarProps) {
    const toggleShow = () => {
        setModalToggle!(!modalToggle);
    };

    return (
        <MDBModal show={modalToggle} setShow={setModalToggle}>
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
                    >
                        <h4>Corpo...</h4>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={toggleShow}>
                            Fechar
                        </MDBBtn>
                        <MDBBtn>Salvar</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}
