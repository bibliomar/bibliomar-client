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
import React, { useRef } from "react";
import {
    ReaderNavbarProps,
    ReaderSettings,
    ReaderThemeAccentOptions,
} from "../../helpers/readerTypes";
import { chooseThemeAccent } from "../../helpers/readerFunctions";
import ReaderCustomizeModalBody from "./ReaderCustomizeModalBody";
import { Size, useWindowSize } from "../../../general/helpers/useWindowSize";

export default function ReaderCustomizeModal({
    readerSettings,
    setReaderSettings,
    modalToggle,
    setModalToggle,
}: ReaderNavbarProps) {
    const toggleShow = () => {
        setModalToggle!(!modalToggle);
    };
    const themeAccent = chooseThemeAccent(readerSettings.themeName);
    const size: Size = useWindowSize();

    return (
        <MDBModal show={modalToggle} setShow={setModalToggle}>
            <MDBModalDialog size={"fullscreen-sm-down"}>
                <MDBModalContent
                    className={
                        themeAccent === ReaderThemeAccentOptions.light
                            ? "reader-modal-light-bg"
                            : "reader-modal-dark-bg"
                    }
                >
                    <MDBModalBody
                        tag="div"
                        className={
                            themeAccent === ReaderThemeAccentOptions.light
                                ? "text-dark"
                                : "text-light"
                        }
                    >
                        <ReaderCustomizeModalBody
                            readerSettings={readerSettings}
                            setReaderSettings={setReaderSettings}
                        />
                    </MDBModalBody>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}
