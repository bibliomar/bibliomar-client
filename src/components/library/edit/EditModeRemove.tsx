import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React, { useContext, useState } from "react";
import { EditModeSubProps } from "../LibraryNavbar";
import { EditMode, SelectedBooks } from "../helpers/libraryContext";
import { removeBookFromLibrary } from "../../general/helpers/generalFunctions";
import { Portal } from "react-portal";
import { useNavigate } from "react-router-dom";
import { EditModeRemoveModal } from "./EditModeRemoveModal";

export default function EditModeRemove({
    actionLoading,
    setActionLoading,
}: EditModeSubProps) {
    const navigate = useNavigate();
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
            navigate(0);
        }
    };

    return (
        <>
            <Portal node={document.getElementById("modal-root")}>
                <EditModeRemoveModal
                    show={modalShow}
                    setShow={setModalShow}
                    onClick={toggleShow}
                    agreedOnClick={() => {
                        toggleShow();
                        handleAgreedClick().then();
                    }}
                />
            </Portal>

            <MDBBtn
                disabled={
                    actionLoading ||
                    selectedBooksContext.selectedBooks.length === 0
                }
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
