import { SearchFormFields, SearchRequestStatusOptions } from "./searchTypes";

function requestErrorAsStatus(status: number): SearchRequestStatusOptions {
    if (status === 400) {
        return SearchRequestStatusOptions.BAD_REQUEST;
    } else if (status === 429) {
        return SearchRequestStatusOptions.TOO_MANY_REQUESTS;
    } else if (status === 500) {
        return SearchRequestStatusOptions.CONNECTION_ERROR;
    } else {
        return SearchRequestStatusOptions.CONNECTION_ERROR;
    }
}

export { requestErrorAsStatus };

export function buildSearchObject(
    values: SearchFormFields,
    offset?: number | undefined,
    limit?: number | undefined
): object {
    const topic = values.topic;
    const type = values.type;
    const query = values.q;
    const format = values.format;
    const language = values.language;
    const fulltext = values.fulltext;

    // PS: Field order is VERY important here.
    // The user query should be at the start of the string, and everything else at the end.
    let finalQueryString = "";

    if (type != null) {
        switch (type) {
            case "title":
                if (finalQueryString.includes("@title")) {
                    finalQueryString.replace("@title", `@title ${query}`);
                } else {
                    finalQueryString += `@title ${query} `;
                }
                break;
            case "author":
                if (finalQueryString.includes("@author")) {
                    finalQueryString.replace("@author", `@author ${query}`);
                } else {
                    finalQueryString += `@author ${query} `;
                }
                break;
            case "any":
                finalQueryString += `${query} `;
                break;
        }
    }

    if (format != null && format !== "any") {
        if (finalQueryString.includes("@extension")) {
            finalQueryString.replace("@extension", `@extension ${format} `);
        } else {
            finalQueryString += `@extension ${format} `;
        }
    }
    if (language != null && language !== "any") {
        if (finalQueryString.includes("@language")) {
            finalQueryString.replace("@language", `@language ${language} `);
        } else {
            finalQueryString += `@language ${language} `;
        }
    }

    if (topic === "fiction") {
        finalQueryString += "@topic fiction ";
    } else if (topic === "scitech") {
        finalQueryString += "@topic scitech ";
    }

    if (fulltext != null && query) {
        finalQueryString = query;
    }

    finalQueryString = finalQueryString.trim();

    const searchObject: any = {
        index: "libgen",
        query: {
            query_string: finalQueryString,
        },
    };

    if (offset != null) {
        searchObject.offset = offset;
    } else {
        searchObject.offset = 0;
    }

    if (limit != null) {
        searchObject.limit = limit;
    } else {
        searchObject.limit = 500;
    }

    if (limit != null && offset != null) {
        const maxMatches = offset + limit;
        searchObject.maxMatches = maxMatches;
    }

    console.log(searchObject);

    return searchObject;
}
