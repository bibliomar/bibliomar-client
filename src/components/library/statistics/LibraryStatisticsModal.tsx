import React, { Dispatch, Suspense, useContext } from "react";
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
import { lazy } from "react";

const LibraryStatisticsContent = lazy(
    () => import("./content/LibraryStatisticsContent")
);
import SuspenseLoadingSpinner from "../../general/SuspenseLoadingSpinner";
import { useTranslation } from "react-i18next";

interface LibraryStatisticsModalProps {
    active: boolean;
    setActive: Dispatch<React.SetStateAction<boolean>>;
}

export default function LibraryStatisticsModal({
    active,
    setActive,
}: LibraryStatisticsModalProps) {
    const { t } = useTranslation();
    return (
        <MDBModal backdrop show={active} setShow={setActive}>
            <MDBModalDialog centered style={{ zIndex: "999999" }} size="lg">
                <MDBModalContent>
                    <MDBModalHeader className="basic-container">
                        <MDBModalTitle
                            tag="h4"
                            className="ms-auto me-auto fw-bold"
                        >
                            {t("library:statistics")}
                        </MDBModalTitle>
                    </MDBModalHeader>
                    <MDBModalBody className="d-flex flex-column h-100 basic-container">
                        <Suspense fallback={<SuspenseLoadingSpinner />}>
                            <LibraryStatisticsContent />
                        </Suspense>
                    </MDBModalBody>
                    <MDBModalFooter className="basic-container">
                        <MDBBtn
                            size={"lg"}
                            className="ms-auto me-auto"
                            onClick={() => setActive(false)}
                        >
                            {t("library:close")}
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}
