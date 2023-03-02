import {
    LibraryCategories,
    Metadata,
} from "../../general/helpers/generalTypes";
import { TFuncReturn, TFunction } from "i18next";

function buildAmazonQuery(metadata: Metadata) {}

/**
 * Returns the URL to a amazon search page.
 * Depends on the current app language and the metadata's title and author.
 * @param language
 * @param metadata
 */
export function getAmazonSearchUrl(
    language: string,
    metadata: Metadata
): string {
    const lang = language.toLowerCase();
    let amazonUrlBase;
    switch (lang) {
        case "en":
            amazonUrlBase = "https://www.amazon.com/";
            break;
        case "en-us":
            amazonUrlBase = "https://www.amazon.com/";
            break;
        case "pt":
            amazonUrlBase = "https://www.amazon.com.br/";
            break;
        case "pt-br":
            amazonUrlBase = "https://www.amazon.com.br/";
            break;
        default:
            amazonUrlBase = "https://www.amazon.com/";
            break;
    }

    const params = new URLSearchParams();
    if (metadata.author != null && metadata.author.trim() !== "") {
        params.append("k", metadata.title + " " + metadata.author);
    } else {
        params.append("k", metadata.title);
    }

    const amazonUrlQuery = `s?${params.toString()}`;

    return amazonUrlBase + amazonUrlQuery;
}

/**
 * Returns the direct URL to a amazon product page.
 * Depends on the metadata's ASIN value.
 * @param metadata
 */
export function getAmazonDirectUrl(metadata: Metadata): string | null {
    let amazonUrlBase;
    if (metadata.asin == null || metadata.asin.trim() === "") {
        return null;
    }

    if (metadata.language != undefined) {
        switch (metadata.language.toLowerCase()) {
            case "english":
                amazonUrlBase = "https://www.amazon.com/";
                break;
            case "portuguese":
                amazonUrlBase = "https://www.amazon.com.br/";
                break;
            default:
                amazonUrlBase = "https://www.amazon.com/";
                break;
        }
    } else {
        amazonUrlBase = "https://www.amazon.com/";
    }

    return amazonUrlBase + `dp/${metadata.asin}`;
}

export function getGoogleBooksSearchUrl(metadata: Metadata) {
    const params = new URLSearchParams();
    if (metadata.author != null && metadata.author.trim() !== "") {
        params.append("q", metadata.title + " " + metadata.author);
    } else {
        params.append("q", metadata.title);
    }
    // Specify the search to be books only
    params.append("tbm", "bks");

    return "https://google.com/search?" + params.toString();
}

export function getGoogleBooksDirectUrl(metadata: Metadata) {
    if (
        metadata.googleBooksId != null &&
        metadata.googleBooksId.trim() !== ""
    ) {
        return `https://books.google.com/books?id=${metadata.googleBooksId}`;
    } else {
        return null;
    }
}

export function getGoodReadsSearchUrl(metadata: Metadata) {
    const goodReadsBase = "https://www.goodreads.com/search?";
    const params = new URLSearchParams();
    if (metadata.author != null && metadata.author.trim() !== "") {
        params.append("q", metadata.title + " " + metadata.author);
    } else {
        params.append("q", metadata.title);
    }

    params.append("search_type", "books");

    return goodReadsBase + params.toString();
}
