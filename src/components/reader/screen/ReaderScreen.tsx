import { ThemeColors } from "../helpers/readerTypes";
import React from "react";
import { ReactReader, ReactReaderStyle } from "react-reader";
import { registerRenditionThemes } from "../helpers/readerFunctions";
import { MDBIcon } from "mdb-react-ui-kit";

interface ReaderScreenProps {
    arrayBuffer: ArrayBuffer;
    title: string | undefined;
    fullscreen: boolean;
    setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
    currentTheme: ThemeColors;
    renditionRef: React.MutableRefObject<any>;
    readerStyle: React.MutableRefObject<ReactReaderStyle>;
    currentPage: string | undefined;
    handleLocationChange: (epubcifi: string) => void;
    swipeable: boolean;
    tocRef: React.MutableRefObject<any>;
}

export default function ReaderScreen({
    arrayBuffer,
    title,
    readerStyle,
    handleLocationChange,
    currentPage,
    currentTheme,
    renditionRef,
    fullscreen,
    setFullscreen,
    swipeable,
    tocRef,
}: ReaderScreenProps) {
    return (
        <div
            id={"reader-reader-screen"}
            style={{
                height: "100%",
                minHeight: "100%",
                width: "100%",
                top: fullscreen ? "0" : "8vh",
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
                onClick={() => setFullscreen(!fullscreen)}
            >
                {fullscreen ? (
                    <MDBIcon fas icon="angle-down" size={"3x"} />
                ) : (
                    <MDBIcon fas icon="angle-up" size={"3x"} />
                )}
            </div>
            <ReactReader
                styles={renditionRef.current ? readerStyle.current : undefined}
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
                    rendition.themes.select(currentTheme[2]);
                }}
            />
        </div>
    );
}
