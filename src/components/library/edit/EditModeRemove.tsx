import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React, { useContext, useState } from "react";
import { EditModeContext } from "../helpers/libraryContext";
import {
    addBookToLibrary,
    removeBookFromLibrary,
} from "../../general/helpers/generalFunctions";
import { Portal } from "react-portal";
import { useNavigate } from "react-router-dom";
import { EditModeRemoveModal } from "./EditModeRemoveModal";
import { toast } from "react-toastify";
import { AuthContext } from "../../general/helpers/generalContext";
import { UserLibraryContext } from "../helpers/libraryFunctions";
import { Trans, useTranslation } from "react-i18next";

export default function EditModeRemove() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const userLibraryContext = useContext(UserLibraryContext);
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

        const infoToast = toast.info("Removendo livros...");

        let removedBooksNum = 0;
        for (const book of editModeContext.selectedBooksRef.current) {
            try {
                toast.update(infoToast, {
                    render: `Removendo ${book.title}...`,
                });
                const req = await removeBookFromLibrary(authContext, book.md5);
                console.log(req);
                if ([200, 201].includes(req.request.status)) {
                    removedBooksNum++;
                }
            } catch (e: any) {
                console.error(e);
                if (e.request) {
                    if (e.request.status === 400) {
                        toast.error(
                            <div>
                                <span>
                                    <Trans
                                        i18nKey="erroAoRemover"
                                        ns="library"
                                    />{" "}
                                    <strong>{book.title}</strong>
                                    {t(
                                        "library:livroNoSeEncontraNaCategoriaDeDestino"
                                    )}
                                </span>
                            </div>
                        );
                    } else {
                        toast.error(
                            <div>
                                <span>
                                    <Trans
                                        i18nKey="erroAoRemover2"
                                        ns="library"
                                    />{" "}
                                    <strong>{book.title}</strong>.
                                </span>
                            </div>
                        );
                    }
                }
            }
        }
        toast.dismiss(infoToast);

        if (removedBooksNum > 0) {
            toast.success(`${removedBooksNum} livros removidos com sucesso.`);
            editModeContext.selectedBooksRef.current = [];
            // PS: The update request is async.
            userLibraryContext.updateUserLibrary();
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
