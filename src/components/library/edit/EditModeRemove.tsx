import {
    MDBBtn,
    MDBIcon,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle,
} from "mdb-react-ui-kit";
import React, { useContext, useState } from "react";
import { EditModeSubProps } from "../LibraryNavbar";
import { EditMode, SelectedBooks } from "../helpers/libraryContext";
import { removeBookFromLibrary } from "../../general/helpers/generalFunctions";
import { Portal } from "react-portal";
import Break from "../../general/Break";

export default function EditModeRemove({
    actionLoading,
    setActionLoading,
}: EditModeSubProps) {
    const editModeContext = useContext(EditMode);
    const selectedBooksContext = useContext(SelectedBooks);
    const jwtToken = localStorage.getItem("jwt-token");

    const [modalShow, setModalShow] = useState(false);

    const toggleShow = () => setModalShow(!modalShow);

    const handleAgreedClick = async () => {
        if (
            editModeContext &&
            editModeContext.editMode &&
            selectedBooksContext &&
            selectedBooksContext.selectedBooks.length > 0 &&
            jwtToken
        ) {
            setActionLoading(true);
            await removeBookFromLibrary(
                selectedBooksContext.selectedBooks,
                jwtToken
            );
            setActionLoading(false);
            window.location.reload();
        }
    };

    return (
        <>
            <Portal node={document.getElementById("modal-root")}>
                <MDBModal
                    backdrop
                    show={modalShow}
                    setShow={setModalShow}
                    tabIndex={"-1"}
                >
                    <MDBModalDialog centered>
                        <MDBModalContent className={"w-100 text-center"}>
                            <MDBModalHeader className="bg-danger">
                                <MDBModalTitle
                                    tag={"h3"}
                                    className={
                                        "ms-auto me-auto text-light fw-bold"
                                    }
                                >
                                    Tem certeza?
                                </MDBModalTitle>
                            </MDBModalHeader>
                            <MDBModalBody className="d-flex flex-wrap justify-content-center">
                                <h5 className="text-center">
                                    Você está prestes a apagar todos os livros
                                    selecionados.
                                </h5>
                                <Break />
                                <p>
                                    Pode ser que você não consiga desfazer essa
                                    ação.
                                </p>
                                <Break />
                                <p className="text-muted">
                                    O seu progresso de leitura nesses livros
                                    também será apagado.
                                </p>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn
                                    size={"lg"}
                                    className="ms-auto"
                                    onClick={toggleShow}
                                >
                                    Voltar
                                </MDBBtn>
                                <MDBBtn
                                    size={"lg"}
                                    color={"danger"}
                                    className="me-auto"
                                    onClick={() => {
                                        toggleShow();
                                        handleAgreedClick().then();
                                    }}
                                >
                                    Confirmar
                                </MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </Portal>
            <MDBBtn
                disabled={actionLoading}
                size={"lg"}
                type={"button"}
                color={"none"}
                className="btn-floating btn-outline-primary"
                onClick={toggleShow}
            >
                {actionLoading ? (
                    <MDBIcon fas icon="spinner" />
                ) : (
                    <MDBIcon fas icon="trash-alt" />
                )}
            </MDBBtn>
        </>
    );
}
