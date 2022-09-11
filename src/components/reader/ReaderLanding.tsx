import Navbar from "../general/navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
import { Portal } from "react-portal";
import ReaderSendLocalFileModal from "./ReaderSendLocalFileModal";
import ReaderDownloader from "./downloader/ReaderDownloader";
import localforage from "localforage";
import BlankLoadingSpinner from "../general/BlankLoadingSpinner";
import {
    PossibleReaderLandingState,
    PossibleReaderScreenState,
    SavedBooks,
} from "./helpers/readerTypes";
import { Auth } from "../general/helpers/generalContext";
import ReaderGreeting from "./ReaderGreeting";

export default function ReaderLanding() {
    const location = useLocation();
    const navigate = useNavigate();
    const authContext = useContext(Auth);
    const [savedBooks, setSavedBooks] = useState<SavedBooks | undefined>(
        undefined
    );
    const [bookOnListRetrieved, setBookOnListRetrieved] =
        useState<boolean>(false);
    const locationState: any = location.state;
    let landingState: PossibleReaderLandingState = locationState;
    console.log(landingState);

    useEffect(() => {
        const ls = localforage.createInstance({
            driver: localforage.INDEXEDDB,
        });
        ls.getItem<SavedBooks | null>("saved-books").then((savedBooks) => {
            if (savedBooks != null) {
                setSavedBooks(savedBooks);
                if (landingState) {
                    Object.values(savedBooks).forEach(
                        (savedBookEntry, index) => {
                            if (savedBookEntry != null) {
                                if (
                                    savedBookEntry.bookInfo.md5 ===
                                    landingState.bookInfo.md5
                                ) {
                                    // Set's this book arrayBuffer as the state if the md5 matches.
                                    const readerScreenState: PossibleReaderScreenState =
                                        {
                                            arrayBuffer:
                                                savedBookEntry.arrayBuffer,
                                            onlineFile: savedBookEntry.bookInfo,
                                            localFile: undefined,
                                        };

                                    navigate(`${savedBookEntry.bookInfo.md5}`, {
                                        state: readerScreenState,
                                        replace: true,
                                    });
                                    return;
                                }
                            }
                        }
                    );
                    setBookOnListRetrieved(true);
                }
            }
        });
    }, []);

    const [modalToggle, setModalToggle] = useState(false);

    const toggleShow = () => setModalToggle(!modalToggle);

    return (
        <div className="like-body bg-alt">
            <div className="container">
                <Portal node={document.getElementById("modal-root")}>
                    <ReaderSendLocalFileModal
                        modalToggle={modalToggle}
                        setModalToggle={setModalToggle}
                    />
                </Portal>
                <Navbar activeItem="reader" />
                <div className="d-flex justify-content-end mt-4 mb-5 me-2">
                    <MDBBtn
                        type="button"
                        color="secondary"
                        onClick={toggleShow}
                    >
                        Enviar arquivo
                    </MDBBtn>
                </div>
                {landingState ? (
                    bookOnListRetrieved ? (
                        <ReaderDownloader
                            bookInfo={landingState.bookInfo}
                            savedBooks={savedBooks}
                        />
                    ) : (
                        <BlankLoadingSpinner />
                    )
                ) : (
                    <ReaderGreeting />
                )}
            </div>
        </div>
    );
}
