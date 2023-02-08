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
import { useTranslation } from "react-i18next";

export function ReaderDeleteCacheModal(props: {
    show: boolean;
    setShow: (value: ((prevState: boolean) => boolean) | boolean) => void;
    onClick: () => void;
    agreedOnClick: () => void;
}) {
    const { t } = useTranslation();
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
                            {t("reader:editUserConfirmation")}
                        </MDBModalTitle>
                    </MDBModalHeader>
                    <MDBModalBody className="d-flex flex-wrap justify-content-center">
                        <h5 className="text-center">
                            {t(
                                "reader:vocEstPrestesAApagarTodosOsLivrosSalvosLocalmente"
                            )}
                        </h5>
                        <Break />
                        <p>
                            {t(
                                "reader:issoProvavelmenteVaiResolverQuaisquerProblemasQueV"
                            )}
                        </p>
                        <Break />
                        <p className="text-muted">
                            {t(
                                "reader:oSeuProgressoDeLeituraOnlineEOfflineNoApagadoApena"
                            )}
                        </p>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn
                            size={"lg"}
                            className="ms-auto"
                            onClick={props.onClick}
                        >
                            {t("reader:editBack")}
                        </MDBBtn>
                        <MDBBtn
                            size={"lg"}
                            color={"danger"}
                            className="me-auto"
                            onClick={props.agreedOnClick}
                        >
                            {t("reader:editConfirm")}
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}
