// This file is to be used for storing types and interfaces common to the whole application.

import React from "react";
import { AxiosError } from "axios";

type Topic = "fiction" | "scitech";

interface MetadataStatistics extends Metadata {
    views: number;
    downloads: number;
}

type DownloadLinks = {
    GET: string;
    Cloudflare: string;
    "IPFS.io": string;
    Infura: string;
    Pinata: string;
};

interface LibraryProperties {
    // All properties here are only valid for library entries. (e.g. metadataList you get from a user's library.)
    // Make sure to check if they exist before using them.
    // The value is an epubcifi string.
    progress?: string | null;

    // The value is a string with the metadataList's category on the user's library.
    // Not to be confused with "topic"
    category?: LibraryCategories | null;
}

interface DownloadMirrors {
    libgenMirror: string;
    librocksMirror: string;
}

interface MetadataProperties {
    // Describes properties which are exclusive to metadataList results.
    // Make sure to check if they exist before using them.
    // These extra infos are mostly used in the BookInfo component.
    asin?: string | null;
    volumeInfo?: string | null;
    edition?: string | null;
    year?: string | null;
    publisher?: string | null;
    description?: string | null;
    series?: string | null;
    timeAdded?: string | null;
    timeLastModified?: string | null;
    downloadMirrors?: DownloadMirrors;
}

/**
 * This is the basic schema of a metadataList. It may include extra properties if it has metadataList or if it's from a user's library.
 * Be sure to check if a property exists before using it.
 */
interface Metadata extends LibraryProperties, MetadataProperties {
    title: string;
    author: string;
    md5: string;
    topic: Topic;
    language?: string | null;
    extension?: string | null;
    fileSize?: number | null;
    formattedSize?: string | null;
    coverUrl?: string | undefined;
}

/**
 * The category schema for a user's library.
 * Each category is composed of a object with the metadataList's md5 as the key and the metadataList as the value.
 */
interface UserLibraryCategory {
    [md5: string]: Metadata;
}

interface UserLibrary {
    reading: UserLibraryCategory;
    toRead: UserLibraryCategory;
    backlog: UserLibraryCategory;

    finished: UserLibraryCategory;

    dropped: UserLibraryCategory;
    username: string;
}

enum LibraryCategories {
    reading = "reading",
    toRead = "toRead",
    finished = "finished",
    backlog = "backlog",
    dropped = "dropped",
}

enum ThemeOptions {
    "light" = "light",
    "dark" = "dark",
}

interface ThemeContextParams {
    theme: ThemeOptions;
    setTheme: (
        value: ThemeOptions | ((val: ThemeOptions) => ThemeOptions)
    ) => void;
}

interface AuthContextParams {
    userLogged: boolean;
    jwtToken: string | null;
    setJwtToken: (
        value: string | ((val: string | null) => string | null) | null
    ) => void;
}

export { ThemeOptions, LibraryCategories };
export type {
    Metadata,
    DownloadLinks,
    ThemeContextParams,
    UserLibrary,
    AuthContextParams,
};
