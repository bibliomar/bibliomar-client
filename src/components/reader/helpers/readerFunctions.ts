// This file exports common functions used by components in /reader or related to its functionality.

import { Metadata } from "../../general/helpers/generalTypes";
import localforage from "localforage";
import {
    FlowOptions,
    ManagerOptions,
    ReaderSettings,
    ReaderThemeAccentOptions,
    ReaderThemeColors,
    ReaderThemeOptions,
    SavedBooks,
} from "./readerTypes";
import axios, { AxiosRequestConfig } from "axios";
import { ReactReaderStyle } from "react-reader";
import { backendUrl } from "../../general/helpers/generalFunctions";

// Below are functions used only in the actual reader screen
interface ThemeColorsModel {
    // This is the model of the tuples describing a reader theme.
    //First item is equivalent to "color" property, and second is to "backgroundColor".
    //The third element is the theme's accent (light or dark).
    //The last element is the theme's name.
    [key: string]: ReaderThemeColors;
}

// These themes will be used by the outter part of the reader.
// They must match the inner part for obvious reasons.
// Be sure to also set on ReaderThemeOptions enum.
export const themeColorsObject: ThemeColorsModel = {
    default: ["#000", "#fff", "light", "default"],
    dark: ["#FFF", "#252525", "dark", "dark"],
    amoled: ["#fff", "#000", "dark", "amoled"],
    paste: ["#231f1f", "#dbd0bf", "light", "paste"],
    mono: ["#343532", "#f2efea", "light", "mono"],
};

// This will automatically register all themes on themeColorsObject as valid Rendition themes.
// Rendition themes cover the inner part of the reader.
// Be sure to keep the outter reader theme in sync.
// Use readerSettings values to define font styles.
export const registerRenditionThemes = (
    rendition: any,
    fontName: string,
    fontWeight: number,
    fontSize: number
) => {
    Object.values(themeColorsObject).forEach((theme) => {
        console.log(theme);
        rendition.themes.register(theme[3], {
            "*": {
                color: `${theme[0]} !important`,
                backgroundColor: `${theme[1]} !important`,
            },

            p: {
                "font-family": fontName ? fontName : "Nunito Sans, sans-serif",
                "font-weight": fontWeight ? `${fontWeight}` : "600",
                "font-size": fontSize ? `${fontSize}px` : "20px",
                "line-height":
                    fontName === "Nunito Sans, sans-serif" ? "27px" : "unset",
                "text-align": "justify",
            },
        });
    });
};

export const createReactReaderStyle = (
    themeName: ReaderThemeOptions,
    readerSettings: ReaderSettings
): ReactReaderStyle => {
    /*
    Index 1 equals to backgroundColor.
    Index 0 equals to text color.
     */

    return {
        tocButtonBarBottom: {
            top: "66%",
        },
        container: {
            overflow: "hidden",
            height: "100%",
        },

        readerArea: {
            fontFamily: "Nunito Sans",
            position: "relative",
            zIndex: 1,
            height: "100%",
            width: "100%",
            backgroundColor: themeColorsObject[themeName][1],
            transition: "all .3s ease",
        },
        containerExpanded: {
            transform: "translateX(256px)",
        },
        titleArea: {
            position: "absolute",
            top: "20px",
            left: "50px",
            right: "50px",
            textAlign: "center",
            color: themeColorsObject[themeName][0],
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
        },
        reader: {
            position: "absolute",
            top: "50px",
            left: "50px",
            bottom: "20px",
            right: "50px",
        },
        swipeWrapper: {
            position: "absolute",
            top: "0",
            left: "0",
            bottom: "0",
            right: "0",
            zIndex: "50",
        },
        prev: {
            left: "1",
        },
        next: {
            right: "1",
        },
        arrow: {
            display:
                readerSettings.swipe ||
                readerSettings.flow === FlowOptions.scrolled
                    ? "none"
                    : "unset",
            outline: "none",
            border: "none",
            background: "none",
            position: "absolute",
            top: "50%",
            marginTop: "-32",
            fontSize: "64px",
            padding: "0 10px",
            color: themeColorsObject[themeName][0],
            fontFamily: "arial, sans-serif",
            cursor: "pointer",
            userSelect: "none",
            appearance: "none",
            fontWeight: "normal",
        },
        arrowHover: {
            color: "#777",
        },
        tocBackground: {
            position: "absolute",
            left: "256",
            top: 0,
            bottom: 0,
            right: 0,
            zIndex: 1,
        },
        tocArea: {
            position: "absolute",
            left: "0",
            top: "0",
            bottom: "0",
            zIndex: "0",
            width: "256",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            background: themeColorsObject[themeName][1],
            padding: "10px 0",
        },
        tocAreaButton: {
            userSelect: "none",
            appearance: "none",
            background: "none",
            border: "none",
            display: "block",
            fontFamily: "sans-serif",
            width: "100%",
            fontSize: "1.1em",
            textAlign: "left",
            padding: ".9em 1em",
            borderBottom: "1px solid #ddd",
            color: themeColorsObject[themeName][0],
            boxSizing: "border-box",
            outline: "none",
            cursor: "pointer",
        },
        tocButton: {
            background: "none",
            border: "none",
            width: "32px",
            height: "62px",
            position: "absolute",
            top: "10",
            left: "10",
            borderRadius: "2",
            outline: "none",
            cursor: "pointer",
        },
        tocButtonExpanded: {
            background: "#f2f2f2",
        },
        tocButtonBar: {
            position: "absolute",
            width: "60%",
            background: themeColorsObject[themeName][0],
            height: "2",
            left: "50%",
            margin: "-1px -30%",
            top: "50%",
            transition: "all .5s ease",
        },
        tocButtonBarTop: {
            top: "35%",
        },

        loadingView: {
            position: "absolute",
            top: "50%",
            left: "10%",
            right: "10%",
            color: "#ccc",
            textAlign: "center",
            marginTop: "-.5em",
        },
    };
};

// This defines the accent used by the navbar.
// Should be called inside the navbar or in relevant components.
export const chooseThemeAccent = (themeName: ReaderThemeOptions) => {
    if (themeColorsObject[themeName][2] === ReaderThemeAccentOptions.light) {
        return ReaderThemeAccentOptions.light;
    } else {
        return ReaderThemeAccentOptions.dark;
    }
};

// Always call this when changing the reader flow.
// Weird stuff will happen otherwise.
export const managerBasedOnFlow = (flow: FlowOptions) => {
    if (flow === FlowOptions.default || flow === FlowOptions.paginated) {
        return ManagerOptions.default;
    } else {
        return ManagerOptions.continuous;
    }
};

// Use these settings as base when changing reader settings.
export const defaultReaderSettings: ReaderSettings = {
    flow: FlowOptions.paginated,
    fullscreen: false,
    manager: managerBasedOnFlow(FlowOptions.paginated),
    swipe: false,
    themeName: ReaderThemeOptions.dark,
    fontFamily: "Helvetica, sans-serif",
    fontWeight: 400,
    fontSize: 16,
};
