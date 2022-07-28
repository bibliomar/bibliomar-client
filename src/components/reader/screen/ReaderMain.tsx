import { ReactReaderStyle } from "react-reader";
import localforage from "localforage";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    PossibleReaderScreenStates,
    ThemeColors,
} from "../helpers/readerTypes";
import {
    createReactReaderStyle,
    themeColorsObject,
    saveProgressOnDatabase,
} from "../helpers/readerFunctions";
import ReaderNavbar from "./ReaderNavbar";
import ReaderScreen from "./ReaderScreen";

export default function ReaderMain() {
    const navigate = useNavigate();
    const location = useLocation();
    const locationState: any = location.state;
    const {
        arrayBuffer,
        localFile,
        onlineFile,
        category,
    }: PossibleReaderScreenStates = locationState;

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
    const [currentTheme, setCurrentTheme] = useState<ThemeColors>(
        themeColorsObject.amoled
    );
    const readerStyle = useRef<ReactReaderStyle>(
        createReactReaderStyle(currentTheme)
    );
    const [swipeable, setSwipeable] = useState<boolean>(false);
    const [fullscreen, setFullscreen] = useState<boolean>(false);
    const renditionRef = useRef<any>();
    const userWarnedRef = useRef<boolean>(false);

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
        if (initialLoadDone) {
            //After the initial page load, we can save the user's progress normally.
            await localforage.setItem(`${identifier}-page`, epubcifi);
            setCurrentPage(epubcifi);
        } else {
            // This function is also called on the very first render, so we just need to set the initial page here.
            const cachedTheme = await localforage.getItem<ThemeColors>(
                "reader-theme"
            );
            if (cachedTheme) {
                setCurrentTheme(cachedTheme);
            }
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
        if (onlineFile && category && currentPage) {
            // Timeout in minutes: minutes * 60000 = miliseconds.
            saveInterval = setInterval(() => {
                saveProgressOnDatabase(category, currentPage, onlineFile).then(
                    (r) => {
                        console.log(r);
                        if (r == null && !userWarnedRef.current) {
                            alert(
                                "Sessão de login expirada, seu progresso não está sendo salvo online atualmente."
                            );
                        }
                    }
                );
            }, 5 * 60000);
        }
        return () => {
            if (saveInterval) {
                clearInterval(saveInterval);
            }
        };
    }, []);

    // Theming side effects
    useEffect(() => {
        localforage.setItem<ThemeColors>("reader-theme", currentTheme).then();
    }, [currentTheme]);

    return (
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
                    maxHeight: fullscreen ? "0" : "8vh",
                    minHeight: fullscreen ? "0" : "8vh",
                }}
            >
                <ReaderNavbar
                    currentTheme={currentTheme}
                    setCurrentTheme={setCurrentTheme}
                />
            </div>
            <ReaderScreen
                arrayBuffer={arrayBuffer}
                title={
                    onlineFile || localFile
                        ? onlineFile?.title || localFile?.name
                        : undefined
                }
                fullscreen={fullscreen}
                setFullscreen={setFullscreen}
                currentTheme={currentTheme}
                renditionRef={renditionRef}
                readerStyle={readerStyle}
                currentPage={currentPage}
                handleLocationChange={handleLocationChange}
                swipeable={swipeable}
            />
        </div>
    );
}
