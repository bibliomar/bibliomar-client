// This file is to be used for storing types and interfaces common to the whole application.

import React from "react";

type downloadLinks = {
    GET: string;
    Cloudflare: string;
    "IPFS.io": string;
    Infura: string;
    Pinata: string;
};

interface Book {
    series: string;
    title: string;
    authors: string;
    language: string;
    file: string;
    mirror1: string;
    mirror2?: string;
    md5: string;
    topic: string;
    extension: string;
    size: string;
    // This is only valid for library entries, and is only used in reader components. The value is an epubcifi string.
    progress?: string;
    // This is only valid for library entries, and is only used in reader components.
    // The value is a string with the book's category on the user's library.
    category?: string;
}

enum ThemeOptions {
    light = "light",
    dark = "dark",
}

interface ThemeContext {
    theme: ThemeOptions;
    setTheme: React.Dispatch<React.SetStateAction<ThemeOptions>>;
}

export { ThemeOptions };
export type { Book, downloadLinks, ThemeContext };
