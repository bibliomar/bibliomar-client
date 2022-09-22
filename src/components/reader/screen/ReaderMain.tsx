import { ReactReaderStyle } from "react-reader";
import localforage from "localforage";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    PossibleReaderLandingState,
    PossibleReaderScreenState,
    ReaderSettings,
    ReaderThemeAccentOptions,
    ReaderThemeColors,
    ReaderThemeOptions,
    SavedBooks,
} from "../helpers/readerTypes";
import {
    chooseThemeAccent,
    createReactReaderStyle,
    defaultReaderSettings,
    findBookLocally,
    saveProgressOnDatabase,
} from "../helpers/readerFunctions";
import ReaderNavbar from "./ReaderNavbar";
import ReaderScreen from "./ReaderScreen";
import { Book } from "../../general/helpers/generalTypes";

export default function ReaderMain() {
    const navigate = useNavigate();
    const location: any = useLocation();
    const params = useParams();
    const locationState: PossibleReaderScreenState | undefined | null =
        location.state;

    let arrayBuffer: ArrayBuffer | undefined;
    let onlineFile: Book | undefined;
    let localFile: File | undefined;

    if (locationState != null) {
        arrayBuffer = locationState.arrayBuffer;
        onlineFile = locationState.onlineFile;
        localFile = locationState.localFile;
    }

    const identifier = localFile
        ? localFile.name
        : onlineFile
        ? onlineFile.md5
        : undefined;

    const possibleReaderSettingsStr = localStorage.getItem("reader-theme");
    const possibleReaderSettings: ReaderSettings | undefined =
        possibleReaderSettingsStr
            ? JSON.parse(possibleReaderSettingsStr)
            : undefined;

    /*
    This state is pretty important, because of the way that react-reader works, everytime you render the page (components updating, etc.)
    the handleChange function gets triggered. What this means is that, if you have an epubcifi saved, in say, localStorage, and you define handleChange
    to change it every time the user changes pages (which is not 100% ideal), you lose everything that was saved before handleChange was called.
     */
    const [initialLoadDone, setInitialLoadDone] = useState<boolean>(false);

    const [currentPage, setCurrentPage] = useState<string | undefined>(
        undefined
    );
    // Tracks the last progress saved on database, it's them compared
    const savedProgressRef = useRef<string | undefined>(undefined);

    // This should contain all settings relevant to the reader, including themes, fullscreen toggle, etc.
    // The component should only render if it's not null.
    const [readerSettings, setReaderSettings] = useState<ReaderSettings>(
        possibleReaderSettings ? possibleReaderSettings : defaultReaderSettings
    );
    // Not to be confused with ReaderTheme on ReaderSettings.
    const [readerStyle, setReaderStyle] = useState<ReactReaderStyle>(
        createReactReaderStyle(readerSettings.themeName, readerSettings)
    );
    const [readerAccent, setReaderAccent] = useState<ReaderThemeAccentOptions>(
        chooseThemeAccent(readerSettings.themeName)
    );

    let showWarningCache = sessionStorage.getItem("reader-navbar-show-warning");
    const [showWarning, setShowWarning] = useState<boolean>(
        showWarningCache ? JSON.parse(showWarningCache) : true
    );

    const renditionRef = useRef<any>(null);
    const tocRef = useRef<any>(null);
    const pageInfoRef = useRef<string | null>(null);
    const notOnLibraryWarned = useRef<boolean>(false);
    const userNotLoggedInWarned = useRef<boolean>(false);

    const locationBasedOnIdentifier = async () => {
        // First, tries for local cache...
        const cachedPage: string | null = await localforage.getItem(
            `${identifier}-page`
        );
        if (cachedPage != null) {
            return cachedPage;
        }
        // If there's no valid local cache, fallback to using a book's progress property.
        if (onlineFile && onlineFile.progress) {
            return onlineFile.progress;
        }
    };

    const handleLocationChange = async (epubcifi: any) => {
        if (tocRef.current && renditionRef.current) {
            const { displayed, href } = renditionRef.current.location.start;
            const chapter = tocRef.current.find(
                (item: any) => item.href === href
            );

            pageInfoRef.current = `Página ${displayed.page} de ${displayed.total} neste capítulo.`;
        }
        if (initialLoadDone) {
            //After the initial page load, we can save the user's progress normally.
            await localforage.setItem(`${identifier}-page`, epubcifi);
            setCurrentPage(epubcifi);
        } else {
            // This function is also called on the very first render, so we just need to set the initial page here.

            setCurrentPage(await locationBasedOnIdentifier());
            setInitialLoadDone(true);
        }
    };

    const paginationTextHandler = () => {
        if (showWarning) {
            return "Caso o avanço de páginas trave, mude o capítulo manualmente.";
        } else if (pageInfoRef.current != null) {
            return pageInfoRef.current;
        } else {
            return "Carregando...";
        }
    };

    // Document side effect
    useEffect(() => {
        if (onlineFile || localFile) {
            document.title = `${
                onlineFile?.title || localFile?.name
            } - Bibliomar Reader`;
        }

        let warningTimeout: number | undefined;
        warningTimeout = window.setTimeout(() => {
            sessionStorage.setItem(
                "reader-navbar-show-warning",
                JSON.stringify(false)
            );
            setShowWarning(false);
        }, 7000);
        return () => {
            if (warningTimeout) {
                window.clearTimeout(warningTimeout);
            }
        };
    }, []);

    // Functional side effects
    useEffect(() => {
        let saveInterval: number | undefined = undefined;

        if (
            arrayBuffer == null ||
            identifier == null ||
            locationState == null
        ) {
            const ls = localforage.createInstance({
                driver: localforage.INDEXEDDB,
            });
            if (
                Object.hasOwn(params, "bookidentifier") &&
                params.bookidentifier !== "local"
            ) {
                findBookLocally(params.bookidentifier!).then(
                    (savedBookIndex) => {
                        ls.getItem<SavedBooks | null>("saved-books").then(
                            (savedBooks) => {
                                if (
                                    savedBookIndex == null ||
                                    savedBooks == null
                                ) {
                                    navigate("/reader", { replace: true });
                                    return;
                                } else {
                                    const savedBook =
                                        Object.values(savedBooks)[
                                            savedBookIndex
                                        ];
                                    if (savedBook == null) {
                                        navigate("/reader", { replace: true });
                                        return;
                                    }
                                    const newReaderScreenState: PossibleReaderScreenState =
                                        {
                                            arrayBuffer: savedBook.arrayBuffer,
                                            onlineFile: savedBook.bookInfo,
                                            localFile: undefined,
                                        };
                                    navigate(
                                        `/reader/${params.bookidentifier}`,
                                        {
                                            replace: true,
                                            state: newReaderScreenState,
                                        }
                                    );
                                }
                            }
                        );
                    }
                );
            }
        }
    }, [arrayBuffer]);

    // Saving side effects
    useEffect(() => {
        let saveInterval: number | undefined = undefined;
        if (onlineFile && currentPage) {
            // Timeout in minutes: minutes * 60000 = miliseconds.
            saveInterval = window.setInterval(() => {
                if (onlineFile!.category == null) {
                    if (!notOnLibraryWarned.current) {
                        notOnLibraryWarned.current = true;
                        alert(
                            "Você está lendo um livro que não está na sua biblioteca, " +
                                "e por isso seu progresso não está sendo salvo online."
                        );
                    }
                    return;
                }
                if (
                    savedProgressRef.current != null &&
                    savedProgressRef.current === currentPage
                ) {
                    return;
                }

                saveProgressOnDatabase(currentPage, onlineFile!).then((r) => {
                    if (!r && !userNotLoggedInWarned.current) {
                        userNotLoggedInWarned.current = true;
                        alert(
                            "Sessão de login expirada, seu progresso não está sendo salvo online."
                        );
                        return;
                    }
                    if (r) {
                        savedProgressRef.current = currentPage;
                        console.log("Progress saved online.");
                    }
                });
            }, 5 * 60000);
        }
        return () => {
            if (saveInterval) {
                clearInterval(saveInterval);
            }
        };
    }, [arrayBuffer]);

    return (
        <>
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    minHeight: "100vh",
                    overflow: "hidden",
                }}
            >
                <div className="bg-alt">
                    <ReaderNavbar
                        readerSettings={readerSettings}
                        setReaderSettings={setReaderSettings}
                        readerAccent={readerAccent}
                    />
                </div>
                {arrayBuffer && readerSettings ? (
                    <ReaderScreen
                        readerStyle={readerStyle}
                        readerSettings={readerSettings}
                        setReaderSettings={setReaderSettings}
                        arrayBuffer={arrayBuffer}
                        title={
                            onlineFile || localFile
                                ? onlineFile?.title || localFile?.name
                                : undefined
                        }
                        tocRef={tocRef}
                        renditionRef={renditionRef}
                        currentPage={currentPage}
                        handleLocationChange={handleLocationChange}
                    />
                ) : null}
            </div>
            <div
                style={{
                    position: "absolute",
                    bottom: "15px",
                    right: "1rem",
                    left: "1rem",
                    fontSize: "1rem",
                    textAlign: "center",
                    zIndex: 1,
                }}
            >
                {paginationTextHandler()}
            </div>
        </>
    );
}
