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
import { useTranslation } from "react-i18next";

interface EditModeRemoveModalProps {
    show: boolean;
    setShow: (value: ((prevState: boolean) => boolean) | boolean) => void;
    onClick: () => void;
    agreedOnClick: () => void;
}

export function EditModeRemoveModal(props: EditModeRemoveModalProps) {
    const { t } = useTranslation();
    return (
        <MDBModal
            backdrop
            show={props.show}
            setShow={props.setShow}
            tabIndex={"-1"}
        >
            <MDBModalDialog centered style={{ zIndex: 9999 }}>
                <MDBModalContent className={"w-100 text-center"}>
                    <MDBModalHeader className="bg-danger">
                        <MDBModalTitle
                            tag={"h3"}
                            className={"ms-auto me-auto text-light fw-bold"}
                        >
                            {t("library:editUserConfirmation")}
                        </MDBModalTitle>
                    </MDBModalHeader>
                    <MDBModalBody className="d-flex flex-wrap justify-content-center">
                        <h5 className="text-center">
                            {t("library:editRemoveWarningText1")}
                        </h5>
                        <Break />
                        <p>{t("library:editRemoveWarningText2")}</p>
                        <Break />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn
                            size={"lg"}
                            className="ms-auto"
                            onClick={props.onClick}
                        >
                            {t("library:editBack")}
                        </MDBBtn>
                        <MDBBtn
                            size={"lg"}
                            color={"danger"}
                            className="me-auto"
                            onClick={props.agreedOnClick}
                        >
                            {t("library:editConfirm")}
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}
