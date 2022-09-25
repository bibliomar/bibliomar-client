enum RequestType {
    SEARCH,
    PAGINATION,
}

enum RequestStatusOptions {
    SENDING,
    LOADING,
    SUCCESS,
    BAD_REQUEST,
    CONNECTION_ERROR,
    BAD_QUERY,
    TOO_MANY_REQUESTS,
}

interface RequestStatus {
    type: RequestType;
    status: RequestStatusOptions;
}

export { RequestType, RequestStatusOptions };
export type { RequestStatus };
