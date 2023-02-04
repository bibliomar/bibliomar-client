import { Book } from "../general/helpers/generalTypes";
import { manticoreUrl } from "../general/helpers/generalFunctions";
// @ts-ignore
import manticore from "manticoresearch";

// Exerpt from SO:
// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function getManticoreSearchApi() {
    let client = new manticore.ApiClient();
    client.basePath = manticoreUrl;
    let searchApi = new manticore.SearchApi(client);
    return searchApi;
}

export function getBooksFromHits(category: string, hits: []) {
    let books: Book[] = [];
    hits.forEach((hit: any) => {
        const hitSource = hit._source;
        const book: Book = {
            title: hitSource.title,
            authors: hitSource.author,
            md5: hitSource.md5,
            language: hitSource.language,
            extension: hitSource.extension,
            topic: category,
            size: hitSource.filesize,
        };
        if (book.size != null) {
            try {
                book.size = formatBytes(parseInt(book.size));
            } catch (e: unknown) {
                console.log(e);
            }
        }
        books.push(book);
    });
    return books;
}
