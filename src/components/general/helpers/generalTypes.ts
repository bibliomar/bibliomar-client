// This file is to be used for storing types and interfaces common to the whole application.

import React from "react";

type DownloadLinks = {
    GET: string;
    Cloudflare: string;
    "IPFS.io": string;
    Infura: string;
    Pinata: string;
};

interface AnyProperties {
    // Makes so that the Book type actually accepts any property with any value.
    // Useful for creating new parameters when you don't know their names.
    [key: string]: any;
}

interface LibraryProperties {
    // All properties here are only valid for library entries. (e.g. book you get from a user's library.)
    // Make sure to check if they exist before using them.

    // The value is an epubcifi string.
    progress?: string | null;
    // The value is a string with the book's category on the user's library.
    // Not to be confused with "topic"
    category?: string | null;
}

interface DownloadMirrors {
    libgenMirror: string;
    librocksMirror: string;
}

interface MetadataProperties {
    // Describes properties which are exclusive to metadata results.
    // Make sure to check if they exist before using them.
    // These extra infos are mostly used in the BookInfo component.

    edition?: string | null;
    year?: string | null;
    publisher?: string | null;
    description?: string | null;
    series?: string | null;
    timeAdded?: string | null;
    timeLastModified?: string | null;
    downloadMirrors?: DownloadMirrors;
}

interface Book extends LibraryProperties, MetadataProperties, AnyProperties {
    // This is the basic schema of a book. It may include extra properties if it has metadata or if it's from a user's library.
    // Be sure to check if a property exists before using it.

    title: string;
    author: string;
    md5: string;
    topic: string;
    language?: string | null;
    extension?: string | null;
    fileSize?: number | null;
    formattedSize?: string | null;
    coverURL?: string | null;
}

interface UserLibrary {
    reading: Book[];
    "to-read": Book[];
    backlog: Book[];
}

enum LibraryCategories {
    reading = "reading",
    toRead = "to-read",
    backlog = "backlog",
}

enum ThemeOptions {
    "light" = "light",
    "dark" = "dark",
}

interface ThemeContext {
    theme: ThemeOptions;
    setTheme: React.Dispatch<React.SetStateAction<ThemeOptions>>;
}

interface AuthContext {
    userLogged: boolean;
    setUserLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

export { ThemeOptions, LibraryCategories };
export type { Book, DownloadLinks, ThemeContext, UserLibrary, AuthContext };
