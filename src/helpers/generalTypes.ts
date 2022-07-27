// This file is to be used for storing types and interfaces common to the whole application.

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
}

export type { Book, downloadLinks };
