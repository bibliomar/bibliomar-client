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
import fileToArrayBuffer from "file-to-array-buffer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PossibleReaderScreenState } from "./helpers/readerTypes";
import { Trans, useTranslation } from "react-i18next";

interface Props {
    modalToggle: boolean;
    setModalToggle: any;
}

export default function ReaderSendLocalFileModal({
    modalToggle,
    setModalToggle,
}: Props) {
    const [bookFile, setBookFile] = useState<File | null>(null);
    const [invalidFile, setInvalidFile] = useState<boolean>(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const navigateToBook = async () => {
        if (bookFile != null) {
            invalidFile ? setInvalidFile(false) : null;
            const arrayBuffer = await fileToArrayBuffer(bookFile);

            const readerState: PossibleReaderScreenState = {
                arrayBuffer: arrayBuffer,
                localFile: bookFile,
                onlineFile: undefined,
            };
            navigate(`/reader/local`, { state: readerState });
        }
    };
    return (
        <MDBModal show={modalToggle} setShow={setModalToggle} tabIndex="-1">
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>
                            {t("reader:envieSeuArquivo")}
                        </MDBModalTitle>
                    </MDBModalHeader>
                    <MDBModalBody className="d-flex flex-wrap justify-content-center">
                        <span className="text-center mb-2">
                            <Trans
                                ns="reader"
                                i18nKey="casoSeuArquivoSejaMuitoGrandeOuVocTenhaUltrapassad"
                                components={{
                                    s: <strong />,
                                }}
                            />
                        </span>
                        <Break />
                        <span className="mb-3">
                            {t(
                                "reader:esseArquivoNoTemOProgressoSalvoOnlineApenasNoSeuDi"
                            )}
                        </span>
                        <Break />

                        <input
                            accept=".epub"
                            type="file"
                            onChange={(evt) => {
                                if (evt.target.files) {
                                    const files: FileList = evt.target.files;
                                    if (
                                        files.item(0)!.type !==
                                        "application/epub+zip"
                                    ) {
                                        setInvalidFile(true);
                                        return;
                                    }

                                    invalidFile ? setInvalidFile(false) : null;
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
                            {t("reader:carregar")}
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}
