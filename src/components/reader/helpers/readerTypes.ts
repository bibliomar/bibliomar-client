// This file exports common types used by /reader components.

import { Metadata } from "../../general/helpers/generalTypes";
import React, { MouseEventHandler } from "react";

// State to be passed to ReaderMain component, making it usable.
export interface PossibleReaderScreenState {
    arrayBuffer: ArrayBuffer;
    onlineFile: Metadata | undefined;
    localFile: File | undefined;
}

// State to be passed to ReaderLanding component, depending on its value, the component will render different subcomponents.
export interface PossibleReaderLandingState {
    bookInfo: Metadata;
}

/* Describes a user savedBooks schema.
You absolutely should use createBookInfoList and createArrayBufferList to effectively use this schema.
Both functions will return you useful arrays in an ordered manner.


Files are saved as ArrayBuffer to be used by react-reader.
Be sure to not save values as undefined, but as null.
 */

// Describes a given entry in SavedBooks, this entry is an object containing these properties.
export interface SavedBookEntry {
    arrayBuffer: ArrayBuffer;
    bookInfo: Metadata;
}

// Describes a SavedBooks object, which will be used to save up to 3 books in localForage.
export type SavedBooks = {
    firstBook: SavedBookEntry | null;
    secondBook: SavedBookEntry | null;
    thirdBook: SavedBookEntry | null;
};

export type ReaderThemeColors = [string, string, string, string];

// Some optional values because this is used in the reader navbar and its children.
export interface ReaderNavbarProps {
    readerSettings: ReaderSettings;
    setReaderSettings: React.Dispatch<React.SetStateAction<ReaderSettings>>;
    readerAccent?: ReaderThemeAccentOptions;
    modalToggle?: boolean;
    setModalToggle?: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Avaiable theme names.
 * Use in createReactReaderStyle and selectRenditionTheme.
 */
export enum ReaderThemeOptions {
    default = "default",
    dark = "dark",
    amoled = "amoled",
    paste = "paste",
    mono = "mono",
}

// Helps define the colors of components which don't inherently use ReaderThemeOptions, like the reader navbar.
// This should be present in all themes.
export enum ReaderThemeAccentOptions {
    light = "light",
    dark = "dark",
}

export enum ManagerOptions {
    default = "default", // Default setting, use when flow is set to auto/paginated.
    continuous = "continuous", // Renders stuff offscreen, use when flow is set to "scrolled".
}

export enum FlowOptions {
    default = "auto", // Based on OPF settings, defaults to "paginated"
    paginated = "paginated", // Left to right, paginated rendering
    scrolled = "scrolled", // Scrolled viewing, works best with
}

// This interface defines the settings the reader has, which may be changed in the ReaderNavbar modal.
export interface ReaderSettings {
    // Screen
    // This one is the only one not inside the modal.
    fullscreen: boolean;

    // Theming
    // The name of the theme that should be used.
    themeName: ReaderThemeOptions;

    // Fonts
    // How the reader fonts should look.
    fontFamily: string;
    fontWeight: number;
    fontSize: number;

    // SearchPagination
    // If swiping to turn pages is enabled
    swipe: boolean;
    // This one should be set based on "flow" below. Set to "default" if flow is "default / paginated", else "continuous"
    // Two options.
    manager: ManagerOptions;
    // Sets the direction of the queryPage.
    // Three options.
    flow: FlowOptions;
}
