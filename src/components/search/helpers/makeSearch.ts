import { useState } from "react";
import { Metadata } from "../../general/helpers/generalTypes";
import {
    ManticoreSearchHits,
    ManticoreSearchResponse,
    SearchRequestStatusOptions,
} from "./searchTypes";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import manticore from "manticoresearch";
import {
    formatBytes,
    hasStorage,
    manticoreUrl,
} from "../../general/helpers/generalFunctions";

type UseSearchReturn = [
    ManticoreSearchResponse | null,
    (searchObject: object) => void
];

function getManticoreSearchApi() {
    const client = new manticore.ApiClient();
    client.basePath = manticoreUrl;
    return new manticore.SearchApi(client);
}

function getBooksFromHits(hits: Metadata[]) {
    const books: Metadata[] = [];
    hits.forEach((hit: any) => {
        const hitSource = hit._source;
        if (hit && hitSource) {
            const book: Metadata = {
                title: hitSource.title,
                author: hitSource.author,
                md5: hitSource.md5,
                language: hitSource.language,
                extension: hitSource.extension,
                topic: hitSource.topic,
                coverUrl: hitSource.coverurl,
                fileSize: hitSource.filesize,
            };
            books.push(book);
        }
    });

    return books;
}

function normalizeResponse(
    response: ManticoreSearchResponse
): ManticoreSearchResponse {
    const normalizedResponse: ManticoreSearchResponse = {
        ...response,
    };
    if (
        normalizedResponse.hits != null &&
        normalizedResponse.hits.hits != null
    ) {
        normalizedResponse.hits.hits = getBooksFromHits(
            normalizedResponse.hits.hits
        );
    }

    return normalizedResponse;
}

function retrieveFromCache(
    searchObject: object
): ManticoreSearchResponse | null {
    const searchObjectString = JSON.stringify(searchObject);
    const cachedResponse = localStorage.getItem(searchObjectString);
    if (cachedResponse != null) {
        return JSON.parse(cachedResponse);
    }
    return null;
}

function cacheResponse(
    searchObject: object,
    response: ManticoreSearchResponse
) {
    const searchObjectString = JSON.stringify(searchObject);
    const responseString = JSON.stringify(response);
    try {
        if (hasStorage(sessionStorage)) {
            sessionStorage.setItem(searchObjectString, responseString);
        }
    } catch (e: unknown) {
        console.log("Error while saving results to cache:");
        console.log(e);
    }
}

/**
 * Important: Exceptions from this function are propagated. Make sure to handle them.
 * The manticore client has no typing file, so make sure to have the documentation open.
 * @param topic The topic to be searched
 * @param searchObject The search object to be sent to Manticore Search
 */
export default async function makeSearch(
    searchObject: object
): Promise<ManticoreSearchResponse | null> {
    // Check if the search results are already cached
    const cachedResponse = retrieveFromCache(searchObject);
    if (cachedResponse != null) {
        // return cachedResponse;
    }

    const searchAPI = getManticoreSearchApi();
    console.log(searchObject);
    const response: ManticoreSearchResponse = await searchAPI.search(
        searchObject
    );

    if (response != null) {
        // Normalize the response
        const normalizedResponse = normalizeResponse(response);
        cacheResponse(searchObject, normalizedResponse);
        return normalizedResponse;
    } else {
        return null;
    }
}
