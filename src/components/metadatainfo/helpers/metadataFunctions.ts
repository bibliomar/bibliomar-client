import { Metadata } from "../../general/helpers/generalTypes";

function buildAmazonQuery(metadata: Metadata) {
    const params = new URLSearchParams();
    if (metadata.author != null && metadata.author.trim() !== "") {
        params.append("k", metadata.title + " " + metadata.author);
    } else {
        params.append("k", metadata.title);
    }
    return params.toString();
}

export function getLocalizedAmazonUrl(
    language: string,
    metadata: Metadata
): string {
    const lang = language.toLowerCase();
    let amazonUrlBase;
    let amazonUrlQuery;
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

    if (metadata.asin != null && metadata.asin.trim() !== "") {
        amazonUrlQuery = `dp/${metadata.asin}`;
    } else {
        amazonUrlQuery = `s?${buildAmazonQuery(metadata)}`;
    }

    return amazonUrlBase + amazonUrlQuery;
}

export function getGoogleBooksUrl(metadata: Metadata) {
    if (
        metadata.googleBooksId != null &&
        metadata.googleBooksId.trim() !== ""
    ) {
        return `https://books.google.com/books?id=${metadata.googleBooksId}`;
    } else {
        const params = new URLSearchParams();
        if (metadata.author != null && metadata.author.trim() !== "") {
            params.append("q", metadata.title + " " + metadata.author);
        } else {
            params.append("q", metadata.title);
        }
        params.append("tbm", "bks");

        return "https://google.com/search?" + params.toString();
    }
}
