import { ReactReaderStyle } from "react-reader";
import localforage from "localforage";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    PossibleReaderScreenState,
    ReaderSettings,
    ReaderThemeAccentOptions,
} from "../helpers/readerTypes";
import {
    chooseThemeAccent,
    createReactReaderStyle,
    defaultReaderSettings,
} from "../helpers/readerFunctions";
import ReaderNavbar from "./ReaderNavbar";
import ReaderScreen from "./ReaderScreen";
import { Metadata } from "../../general/helpers/generalTypes";
import { useTranslation } from "react-i18next";

/**
 * This component is... difficult. It used to be way more complex with online downloading functionality.
 * Now, it's a "simple" ebook reader, but it's still pretty complex.
 * This single component is responsible for 100kb of Bibliomar's bundle size. It should always be lazy loaded.
 */
export default function ReaderMain() {
    const { t } = useTranslation();
    const location: any = useLocation();
    const locationState: PossibleReaderScreenState | undefined | null =
        location.state;

    let arrayBuffer: ArrayBuffer | undefined;
    let localFile: File | undefined;

    if (locationState != null) {
        arrayBuffer = locationState.arrayBuffer;
        localFile = locationState.localFile;
    }

    const identifier = localFile ? localFile.name : undefined;

    const possibleReaderSettingsStr = localStorage.getItem("reader-theme");
    const possibleReaderSettings: ReaderSettings | undefined =
        possibleReaderSettingsStr
            ? JSON.parse(possibleReaderSettingsStr)
            : undefined;

    /*
    This state is pretty important, because of the way that react-reader works, everytime you render the queryPage (components updating, etc.)
    the handleChange function gets triggered. What this means is that, if you have an epubcifi saved, in say, localStorage, and you define handleChange
    to change it every time the user changes pages (which is not 100% ideal), you lose everything that was saved before handleChange was called.
     */
    const [initialLoadDone, setInitialLoadDone] = useState<boolean>(false);

    const [currentPage, setCurrentPage] = useState<string | undefined>(
        undefined
    );
    // Tracks the current num of changed pages.
    const numOfChangedPages = useRef<number>(0);

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
    };

    const handleLocationChange = async (epubcifi: any) => {
        if (tocRef.current && renditionRef.current) {
            const { displayed, href } = renditionRef.current.location.start;
            const chapter = tocRef.current.find(
                (item: any) => item.href === href
            );

            pageInfoRef.current = t("reader:pginaDeNesteCaptulo", {
                page: displayed.page,
                total: displayed.total,
            });
        }

        if (initialLoadDone) {
            //After the initial queryPage load, we can save the user's progress normally.
            await localforage.setItem(`${identifier}-page`, epubcifi);
            if (numOfChangedPages.current >= 10) {
                numOfChangedPages.current = 0;
            }
            numOfChangedPages.current += 1;
            setCurrentPage(epubcifi);
        } else {
            // This function is also called on the very first render, so we just need to set the initial queryPage here.

            setCurrentPage(await locationBasedOnIdentifier());
            setInitialLoadDone(true);
        }
    };

    const paginationTextHandler = () => {
        if (pageInfoRef.current != null) {
            return pageInfoRef.current;
        } else {
            return t("reader:carregando");
        }
    };

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
                        title={localFile?.name}
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
