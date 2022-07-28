import { ThemeColors } from "../helpers/readerTypes";
import React from "react";
import { ReactReader, ReactReaderStyle } from "react-reader";
import { registerRenditionThemes } from "../helpers/readerFunctions";

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
}: ReaderScreenProps) {
    return (
        <div
            id={"reader-reader-screen"}
            style={{
                // Should inherit both to 100%
                height: "inherit",
                minHeight: "inherit",
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
                    top: "20px",
                    left: "50px",
                    right: "50px",
                    height: "5vh",
                    width: "60%",
                    cursor: "pointer",
                    marginLeft: "auto",
                    marginRight: "auto",
                    //Swipe area zIndex is 200.
                    zIndex: "300",
                }}
                onClick={() => setFullscreen(!fullscreen)}
            ></div>
            <ReactReader
                styles={renditionRef.current ? readerStyle.current : undefined}
                location={currentPage}
                locationChanged={handleLocationChange}
                url={arrayBuffer}
                title={title}
                swipeable={swipeable}
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
