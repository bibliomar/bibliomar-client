// This file is to be used for storing types and interfaces common to the whole application.

import React from "react";

type DownloadLinks = {
    GET: string;
    Cloudflare: string;
    "IPFS.io": string;
    Infura: string;
    Pinata: string;
};

interface LibraryProperties {
    // This is only valid for library entries, and is only used in reader components. The value is an epubcifi string.
    progress?: string;
    // This is only valid for library entries.
    // The value is a string with the book's category on the user's library.
    // Not to be confused with "topic"
    category?: string;
}

interface MetadataProperties {
    // Describes properties which are exclusive to metadata results.
    // Make sure to check if they exist before using them.
    // These extra infos are mostly used in the BookInfo component.
    edition?: string | null;
    year?: string | null;
    publisher: string | null;
    isbn?: string | null;
    description?: string | null;
}

interface Book extends LibraryProperties, MetadataProperties {
    // This is the basic schema of a book. It may include extra properties if it has metadata or if it's from a user's library.
    // Be sure to check if a property exists before using it.
    series: string | null;
    title: string;
    authors: string;
    language: string;
    // These three are not saved to a user's library.
    file?: string;
    mirror1?: string;
    mirror2?: string;
    md5: string;
    topic: string;
    extension: string;
    size: string;
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
