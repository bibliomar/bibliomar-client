import { ReaderSettings, ReaderThemeColors } from "../helpers/readerTypes";
import React from "react";
import { ReactReader, ReactReaderStyle } from "react-reader";
import {
    registerRenditionThemes,
    createReactReaderStyle,
} from "../helpers/readerFunctions";
import { MDBIcon } from "mdb-react-ui-kit";

interface ReaderScreenProps {
    readerStyle: ReactReaderStyle;
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
    readerStyle,
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
                    top: "12px",
                    left: "96vw",
                    cursor: "pointer",
                    //Swipe area zIndex is 200.
                    zIndex: "300",
                }}
                onClick={(evt) => {
                    setReaderSettings({
                        ...readerSettings,
                        fullscreen: !readerSettings.fullscreen,
                    });
                }}
            >
                {readerSettings.fullscreen ? (
                    <MDBIcon fas icon="angle-down" size={"3x"} />
                ) : (
                    <MDBIcon fas icon="angle-up" size={"3x"} />
                )}
            </div>
            <ReactReader
                // Be sure to only set this after the rendition is loaded.
                styles={renditionRef.current ? readerStyle : undefined}
                location={currentPage}
                locationChanged={handleLocationChange}
                url={arrayBuffer}
                title={title}
                tocChanged={(toc) => {
                    tocRef.current = toc;
                }}
                getRendition={(rendition) => {
                    renditionRef.current = rendition;
                    registerRenditionThemes(
                        rendition,
                        readerSettings.fontFamily,
                        readerSettings.fontWeight,
                        readerSettings.fontSize
                    );
                    rendition.themes.select(readerSettings.themeName);
                }}
            />
        </div>
    );
}
