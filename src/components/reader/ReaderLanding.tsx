import Navbar from "../general/navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MDBBtn, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { Portal } from "react-portal";
import ReaderSendLocalFileModal from "./ReaderSendLocalFileModal";
import localforage from "localforage";
import ReaderGreeting from "./ReaderGreeting";
import { ReaderDeleteCacheModal } from "./ReaderDeleteCacheModal";
import { useToggle } from "../general/helpers/useToggle";
import { useTranslation } from "react-i18next";

export default function ReaderLanding() {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [savedBooksRetrieved, setSavedBooksRetrieved] = useToggle(false);
    const locationState: any = location.state;

    const [sendModal, setSendModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const toggleSend = () => setSendModal(!sendModal);
    const toggleDelete = () => setDeleteModal(!deleteModal);
    const handleDeleteCache = async () => {
        const ls = localforage.createInstance({
            driver: localforage.INDEXEDDB,
        });
        await ls.clear();
        window.location.reload();
    };

    return (
        <div className="container-fluid min-vh-100 d-flex flex-column">
            <Portal node={document.getElementById("modal-root")}>
                <ReaderSendLocalFileModal
                    modalToggle={sendModal}
                    setModalToggle={setSendModal}
                />
                <ReaderDeleteCacheModal
                    show={deleteModal}
                    setShow={setDeleteModal}
                    onClick={toggleDelete}
                    agreedOnClick={handleDeleteCache}
                />
            </Portal>
            <MDBRow>
                <MDBCol>
                    <Navbar activeItem="reader" />
                </MDBCol>
            </MDBRow>
            <div className="d-flex justify-content-end mt-4 mb-5 me-2">
                <MDBBtn
                    className="me-3"
                    type="button"
                    color="danger"
                    onClick={toggleDelete}
                >
                    {t("reader:limparCacheDoLeitor")}
                </MDBBtn>

                <MDBBtn type="button" color="secondary" onClick={toggleSend}>
                    {t("reader:enviarArquivo")}
                </MDBBtn>
            </div>
            <div
                className="d-flex flex-wrap justify-content-center w-100"
                style={{ minHeight: "30vh" }}
            >
                <ReaderGreeting />
            </div>
        </div>
    );
}
