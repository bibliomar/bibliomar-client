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

interface LibraryStatisticsModalProps {
    active: boolean;
    setActive: Dispatch<React.SetStateAction<boolean>>;
}

export default function LibraryStatisticsModal({
    active,
    setActive,
}: LibraryStatisticsModalProps) {
    return (
        <MDBModal backdrop show={active} setShow={setActive}>
            <MDBModalDialog centered style={{ zIndex: "999999" }} size="lg">
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle
                            tag="h4"
                            className="ms-auto me-auto fw-bold"
                        >
                            Statistics
                        </MDBModalTitle>
                    </MDBModalHeader>
                    <MDBModalBody className="d-flex flex-column h-100">
                        <Suspense fallback={<SuspenseLoadingSpinner />}>
                            <LibraryStatisticsContent />
                        </Suspense>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn
                            size={"lg"}
                            className="ms-auto me-auto"
                            onClick={() => setActive(false)}
                        >
                            Close
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}
