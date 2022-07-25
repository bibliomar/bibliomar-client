enum Topic {}

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

export type { Book };
