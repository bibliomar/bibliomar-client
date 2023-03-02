import { useToggle } from "../../general/helpers/useToggle";
import { MDBBtn, MDBIcon, MDBModal } from "mdb-react-ui-kit";
import { Portal } from "react-portal";
import React, { Suspense, useState } from "react";
import SuspenseLoadingSpinner from "../../general/SuspenseLoadingSpinner";
import LibraryStatisticsModal from "./LibraryStatisticsModal";

interface LibraryStatisticsToggleProps {
    active: boolean;
    toggleActive: () => void;
}

export default function LibraryStatisticsToggle() {
    const [modalActive, setModalActive] = useState<boolean>(false);
    return (
        <>
            {modalActive ? (
                <Portal
                    node={document && document.getElementById("modal-root")}
                >
                    <LibraryStatisticsModal
                        active={modalActive}
                        setActive={setModalActive}
                    />
                </Portal>
            ) : null}

            <MDBBtn
                size={"lg"}
                type={"button"}
                color={modalActive ? "primary" : "none"}
                className={`btn-floating ${
                    modalActive ? "" : "btn-outline-primary"
                }`}
                onClick={() => setModalActive((prev) => !prev)}
            >
                <MDBIcon fas icon="info" size="lg" />
            </MDBBtn>
        </>
    );
}
