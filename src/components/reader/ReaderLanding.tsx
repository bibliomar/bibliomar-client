import Navbar from "../general/Navbar";
import BlankLoadingSpinner from "../general/BlankLoadingSpinner";
import { useEffect, useState } from "react";
import { Portal } from "react-portal";
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
import { useNavigate } from "react-router-dom";

export default function ReaderLanding() {
    const navigate = useNavigate();
    const [modalToggle, setModalToggle] = useState(true);
    const [bookFile, setBookFile] = useState<File | null>(null);
    const toggleShow = () => setModalToggle(!modalToggle);

    const navigateToBook = () => {
        if (bookFile != null) {
            navigate(`${bookFile?.name}`, { state: { book: bookFile } });
        }
    };

    return (
        <div className="like-body bg-alt">
            <div className="container">
                <MDBModal
                    show={modalToggle}
                    setShow={setModalToggle}
                    tabIndex="-1"
                    staticBackdrop
                >
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Envie seu arquivo</MDBModalTitle>
                            </MDBModalHeader>
                            <MDBModalBody className="d-flex flex-wrap justify-content-center">
                                <span className="text-center mb-2">
                                    Para usar o leitor online do Bibliomar, você
                                    deve fornecer seu próprio arquivo, em
                                    formato <strong>epub</strong>.
                                </span>
                                <Break />
                                <span className="text-center mb-4">
                                    Você também pode arrastar seu arquivo para
                                    cá.
                                </span>
                                <Break />

                                <input
                                    accept=".epub"
                                    type="file"
                                    onChange={(evt) => {
                                        if (evt.target.files) {
                                            const files: FileList =
                                                evt.target.files;
                                            setBookFile(files.item(0));
                                        }
                                    }}
                                />
                            </MDBModalBody>

                            <MDBModalFooter>
                                <MDBBtn
                                    disabled={
                                        bookFile == null ||
                                        bookFile.type !== "application/epub+zip"
                                    }
                                    onClick={navigateToBook}
                                >
                                    Carregar
                                </MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
                <Navbar />
                <BlankLoadingSpinner />
                <div className="d-flex justify-content-center"></div>
            </div>
        </div>
    );
}
