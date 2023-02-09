import { SearchRequestStatusOptions } from "./searchTypes";

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
