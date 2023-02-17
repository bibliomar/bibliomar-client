import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React, { useContext, useState } from "react";
import { EditModeContext } from "../helpers/libraryContext";
import { removeBookFromLibrary } from "../../general/helpers/generalFunctions";
import { Portal } from "react-portal";
import { useNavigate } from "react-router-dom";
import { EditModeRemoveModal } from "./EditModeRemoveModal";
import { toast } from "react-toastify";
import { AuthContext } from "../../general/helpers/generalContext";

export default function EditModeRemove() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const editModeContext = useContext(EditModeContext);

    const [modalShow, setModalShow] = useState(false);

    const toggleShow = () => setModalShow(!modalShow);

    const handleAgreedClick = async () => {
        if (
            !editModeContext.editMode ||
            editModeContext.selectedBooksRef.current.length === 0 ||
            !authContext.userLogged
        ) {
            if (editModeContext.selectedBooksRef.current.length === 0) {
                toast.error("Nenhum livro selecionado.");
            }
            return;
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
                size={"lg"}
                type={"button"}
                color={"none"}
                className="btn-floating btn-outline-primary"
                onClick={toggleShow}
            >
                <MDBIcon fas icon="trash-alt" />
            </MDBBtn>
        </>
    );
}
