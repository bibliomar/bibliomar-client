import Navbar from "../general/Navbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { MDBBtn, MDBProgress, MDBProgressBar } from "mdb-react-ui-kit";
import { Portal } from "react-portal";
import ReaderSendModal from "./ReaderSendModal";
import ReaderDownloader, { SavedBooks } from "./downloader/ReaderDownloader";
import { Book } from "../../helpers/types";
import ReaderSavedBooksScreen from "./saved/ReaderSavedBooksScreen";
import localforage from "localforage";

export interface PossibleReaderStates {
    bookInfo: Book | undefined;
    localInfo: File | undefined;
    arrayBuffer: ArrayBuffer;
}

interface PossibleLandingStates {
    bookInfo: Book | undefined;
    url: string | undefined;
}

export default function ReaderLanding() {
    const location = useLocation();
    const [savedBooks, setSavedBooks] = useState<SavedBooks | undefined>(
        undefined
    );

    let bookInfo: Book | undefined = undefined;
    let url = null;
    let locationState: PossibleLandingStates | any = location.state;

    if (locationState != null) {
        bookInfo = locationState.bookInfo;
        url = locationState.url;
    }

    useEffect(() => {
        const ls = localforage.createInstance({
            driver: localforage.INDEXEDDB,
        });
        ls.getItem<SavedBooks | null>("saved-books").then((r) => {
            if (r != null) {
                setSavedBooks(r);
            }
        });
    }, []);

    const [modalToggle, setModalToggle] = useState(false);

    const toggleShow = () => setModalToggle(!modalToggle);

    return (
        <div className="like-body bg-alt">
            <div className="container text-light">
                <Portal node={document.getElementById("modal-root")}>
                    <ReaderSendModal
                        modalToggle={modalToggle}
                        setModalToggle={setModalToggle}
                    />
                </Portal>
                <Navbar />
                <div className="d-flex justify-content-end mt-4">
                    <MDBBtn
                        type="button"
                        color="secondary"
                        onClick={toggleShow}
                    >
                        Enviar arquivo
                    </MDBBtn>
                </div>
                {url && bookInfo ? (
                    <ReaderDownloader
                        url={url}
                        bookInfo={bookInfo}
                        savedBooks={savedBooks}
                    />
                ) : (
                    <ReaderSavedBooksScreen savedBooks={savedBooks} />
                )}
            </div>
        </div>
    );
}
