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
                position: "absolute",
                backgroundColor: "black",
            }}
        >
            <div
                id="fullscreen-toggle-arrow"
                className="reader-fullscreen-toggle"
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
                swipeable={readerSettings.swipe}
                getRendition={(rendition) => {
                    registerRenditionThemes(
                        rendition,
                        readerSettings.fontFamily,
                        readerSettings.fontWeight,
                        readerSettings.fontSize
                    );
                    rendition.themes.select(readerSettings.themeName);
                    renditionRef.current = rendition;
                }}
            />
        </div>
    );
}
