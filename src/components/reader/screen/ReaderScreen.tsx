import { ReaderSettings, ReaderThemeColors } from "../helpers/readerTypes";
import React from "react";
import { ReactReader, ReactReaderStyle } from "react-reader";
import { registerRenditionThemes } from "../helpers/readerFunctions";
import { MDBIcon } from "mdb-react-ui-kit";

interface ReaderScreenProps {
    readerSettings: ReaderSettings;
    setReaderSettings: React.Dispatch<React.SetStateAction<ReaderSettings>>;
    arrayBuffer: ArrayBuffer;
    title: string | undefined;
    renditionRef: React.MutableRefObject<any>;
    currentPage: string | undefined;
    handleLocationChange: (epubcifi: string) => void;
    tocRef: React.MutableRefObject<any>;
}

export default function ReaderScreen({
    readerSettings,
    setReaderSettings,
    arrayBuffer,
    title,
    handleLocationChange,
    currentPage,
    renditionRef,
    tocRef,
}: ReaderScreenProps) {
    return (
        <div
            id={"reader-reader-screen"}
            style={{
                height: "100%",
                minHeight: "100%",
                width: "100%",
                top: readerSettings.fullscreen ? "0" : "8vh",
                position: "absolute",
                backgroundColor: "black",
            }}
        >
            <div
                id="title-toggle-fullscreen"
                style={{
                    position: "absolute",
                    top: "5px",
                    left: "90vw",
                    cursor: "pointer",
                    //Swipe area zIndex is 200.
                    zIndex: "300",
                }}
                onClick={() =>
                    setReaderSettings({
                        ...readerSettings,
                        fullscreen: !readerSettings.fullscreen,
                    })
                }
            >
                {readerSettings.fullscreen ? (
                    <MDBIcon fas icon="angle-down" size={"3x"} />
                ) : (
                    <MDBIcon fas icon="angle-up" size={"3x"} />
                )}
            </div>
            <ReactReader
                styles={
                    readerSettings.readerStyles
                        ? readerSettings.readerStyles
                        : undefined
                }
                location={currentPage}
                locationChanged={handleLocationChange}
                url={arrayBuffer}
                title={title}
                tocChanged={(toc) => {
                    tocRef.current = toc;
                }}
                getRendition={(rendition) => {
                    renditionRef.current = rendition;
                    registerRenditionThemes(rendition);
                    // 2 is the index of the theme name.
                    rendition.themes.select(readerSettings.themeName);
                }}
            />
        </div>
    );
}
