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
import Break from "../general/Break";
import React from "react";

export function ReaderDeleteCacheModal(props: {
    show: boolean;
    setShow: (value: ((prevState: boolean) => boolean) | boolean) => void;
    onClick: () => void;
    agreedOnClick: () => void;
}) {
    return (
        <MDBModal
            backdrop
            show={props.show}
            setShow={props.setShow}
            tabIndex={"-1"}
        >
            <MDBModalDialog centered>
                <MDBModalContent className={"w-100 text-center"}>
                    <MDBModalHeader className="bg-danger">
                        <MDBModalTitle
                            tag={"h3"}
                            className={"ms-auto me-auto text-light fw-bold"}
                        >
                            Tem certeza?
                        </MDBModalTitle>
                    </MDBModalHeader>
                    <MDBModalBody className="d-flex flex-wrap justify-content-center">
                        <h5 className="text-center">
                            Você está prestes a apagar todos os livros salvos
                            localmente.
                        </h5>
                        <Break />
                        <p>
                            Isso provavelmente vai resolver quaisquer problemas
                            que você esteja tendo com o leitor online.
                        </p>
                        <Break />
                        <p className="text-muted">
                            O seu progresso de leitura online e offline não é
                            apagado, apenas os arquivos salvos no seu
                            dispositivo.
                        </p>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn
                            size={"lg"}
                            className="ms-auto"
                            onClick={props.onClick}
                        >
                            Voltar
                        </MDBBtn>
                        <MDBBtn
                            size={"lg"}
                            color={"danger"}
                            className="me-auto"
                            onClick={props.agreedOnClick}
                        >
                            Confirmar
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}
