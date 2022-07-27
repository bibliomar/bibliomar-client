import Navbar from "../general/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
import { Portal } from "react-portal";
import ReaderSendModal from "./ReaderSendModal";
import ReaderDownloader from "./downloader/ReaderDownloader";
import ReaderSavedBooksScreen from "./saved/ReaderSavedBooksScreen";
import localforage from "localforage";
import BlankLoadingSpinner from "../general/BlankLoadingSpinner";
import { PossibleReaderLandingStates, SavedBooks } from "./helpers/readerTypes";

export default function ReaderLanding() {
    const location = useLocation();
    const [savedBooks, setSavedBooks] = useState<SavedBooks | undefined>(
        undefined
    );
    console.log(savedBooks);
    const [savedBooksRetrieved, setSavedBooksRetrieved] =
        useState<boolean>(false);

    let landingState: PossibleReaderLandingStates | any = location.state;

    useEffect(() => {
        const ls = localforage.createInstance({
            driver: localforage.INDEXEDDB,
        });
        ls.getItem<SavedBooks | null>("saved-books").then((r) => {
            if (r != null) {
                setSavedBooks(r);
            }
            setSavedBooksRetrieved(true);
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
                <div className="d-flex justify-content-end mt-4 mb-5 me-2">
                    <MDBBtn
                        type="button"
                        color="secondary"
                        onClick={toggleShow}
                    >
                        Enviar arquivo
                    </MDBBtn>
                </div>
                {savedBooksRetrieved ? (
                    landingState ? (
                        <ReaderDownloader
                            url={landingState.url}
                            secondaryUrl={landingState.secondaryUrl}
                            bookInfo={landingState.bookInfo}
                            savedBooks={savedBooks}
                        />
                    ) : (
                        <ReaderSavedBooksScreen savedBooks={savedBooks} />
                    )
                ) : (
                    <BlankLoadingSpinner />
                )}
            </div>
        </div>
    );
}
