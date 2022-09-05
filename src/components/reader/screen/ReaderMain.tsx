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
    const savedProgressRef = useRef<string | undefined>(undefined);
    // This should contain all settings relevant to the reader, including themes, fullscreen toggle, etc.
    // The component should only render if it's not null.
    const [readerSettings, setReaderSettings] = useState<ReaderSettings>(
        possibleReaderSettings ? possibleReaderSettings : defaultReaderSettings
    );
    // Not to be confused with ReaderTheme on ReaderSettings.
    const [readerStyle, setReaderStyle] = useState<ReactReaderStyle>(
        createReactReaderStyle(readerSettings.themeName)
    );
    const [readerAccent, setReaderAccent] = useState<ReaderThemeAccentOptions>(
        chooseThemeAccent(readerSettings.themeName)
    );
    const renditionRef = useRef<any>(null);
    const tocRef = useRef<any>(null);
    const pageInfoRef = useRef<string | null>(null);

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

    // Title side effect
    useEffect(() => {
        if (onlineFile || localFile) {
            document.title = `${
                onlineFile?.title || localFile?.name
            } - Bibliomar Reader`;
        }
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

        if (onlineFile && currentPage) {
            // Timeout in minutes: minutes * 60000 = miliseconds.
            saveInterval = window.setInterval(() => {
                if (onlineFile!.category == null) {
                    if (sessionStorage.getItem("reader-user-warned") == null) {
                        sessionStorage.setItem("reader-user-warned", "true");
                        alert(
                            "Você está lendo um livro que não está na sua biblioteca, " +
                                "e por isso seu progresso não está sendo salvo online."
                        );
                    }
                    return;
                }
                if (
                    savedProgressRef != null &&
                    savedProgressRef.current === currentPage
                ) {
                    return;
                }
                saveProgressOnDatabase(currentPage, onlineFile!).then((r) => {
                    if (
                        r == null &&
                        sessionStorage.getItem("reader-user-warned") == null
                    ) {
                        sessionStorage.setItem("reader-user-warned", "true");
                        alert(
                            "Sessão de login expirada, seu progresso não está sendo salvo online."
                        );
                    }
                    if (r != null) {
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
    }, []);

    // Theming side effects
    useEffect(() => {}, []);

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
                <div
                    className="bg-alt"
                    style={{
                        maxHeight: readerSettings.fullscreen ? "0" : "9vh",
                        minHeight: readerSettings.fullscreen ? "0" : "9vh",
                    }}
                >
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
                    bottom: "1rem",
                    right: "1rem",
                    left: "1rem",
                    textAlign: "center",
                    zIndex: 1,
                }}
            >
                {initialLoadDone
                    ? pageInfoRef.current
                        ? pageInfoRef.current
                        : null
                    : "Livro carregado."}
            </div>
        </>
    );
}
