import { ReactReaderStyle } from "react-reader";
import localforage from "localforage";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    PossibleReaderScreenState,
    ReaderSettings,
    ReaderThemeColors,
    ReaderThemeOptions,
} from "../helpers/readerTypes";
import {
    createReactReaderStyle,
    defaultReaderSettings,
    saveProgressOnDatabase,
} from "../helpers/readerFunctions";
import ReaderNavbar from "./ReaderNavbar";
import ReaderScreen from "./ReaderScreen";

export default function ReaderMain() {
    const navigate = useNavigate();
    const location = useLocation();
    const locationState: any = location.state;
    const { arrayBuffer, localFile, onlineFile }: PossibleReaderScreenState =
        locationState;

    const identifier = localFile
        ? localFile.name
        : onlineFile
        ? onlineFile.md5
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
    // This should contain all settings relevant to the reader, including themes, fullscreen toggle, etc.
    // The component should only render if it's not null.
    const [readerSettings, setReaderSettings] = useState<ReaderSettings>(
        defaultReaderSettings
    );
    const renditionRef = useRef<any>(null);
    const tocRef = useRef<any>(null);
    const pageInfoRef = useRef<string | null>(null);
    const userWarnedRef = useRef<boolean | null>(
        sessionStorage.getItem("user-warned") === "true"
    );

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

    // Functional side effects
    useEffect(() => {
        let saveInterval: number | undefined = undefined;
        if (arrayBuffer == null || identifier == null) {
            navigate("reader", { replace: true });
            return;
        }

        if (onlineFile && currentPage) {
            // Timeout in minutes: minutes * 60000 = miliseconds.
            saveInterval = setInterval(() => {
                if (onlineFile.category == null) {
                    if (!userWarnedRef.current) {
                        sessionStorage.setItem("user-warned", "true");
                        userWarnedRef.current = true;
                        alert(
                            "Você está lendo um livro que não está na sua biblioteca, " +
                                "e por isso seu progresso não está sendo salvo online."
                        );
                    }
                    return;
                }
                saveProgressOnDatabase(currentPage, onlineFile).then((r) => {
                    if (r == null && !userWarnedRef.current) {
                        sessionStorage.setItem("user-warned", "true");
                        userWarnedRef.current = true;
                        alert(
                            "Sessão de login expirada, seu progresso não está sendo salvo online."
                        );
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

    // @ts-ignore
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
                        maxHeight: readerSettings.fullscreen ? "0" : "8vh",
                        minHeight: readerSettings.fullscreen ? "0" : "8vh",
                    }}
                >
                    <ReaderNavbar
                        readerSettings={readerSettings}
                        setReaderSettings={setReaderSettings}
                    />
                </div>
                {readerSettings.readerStyles != null ? (
                    <ReaderScreen
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
                        //@ts-ignore
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
                {pageInfoRef.current ? pageInfoRef.current : null}
            </div>
        </>
    );
}
