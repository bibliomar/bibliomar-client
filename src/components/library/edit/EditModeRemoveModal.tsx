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
import Break from "../../general/Break";

interface EditModeRemoveModalProps {
    show: boolean;
    setShow: (value: ((prevState: boolean) => boolean) | boolean) => void;
    onClick: () => void;
    agreedOnClick: () => void;
}

export function EditModeRemoveModal(props: EditModeRemoveModalProps) {
    return (
        <MDBModal
            backdrop
            show={props.show}
            setShow={props.setShow}
            tabIndex={"-1"}
        >
            <MDBModalDialog centered style={{zIndex: 9999}}>
                <MDBModalContent className={"w-100 text-center"} >
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
                            Você está prestes a apagar todos os livros
                            selecionados.
                        </h5>
                        <Break />
                        <p>Pode ser que você não consiga desfazer essa ação.</p>
                        <Break />
                        <p className="text-muted">
                            O seu progresso de leitura nesses livros também será
                            apagado.
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
