import { Book } from "../../general/helpers/generalTypes";

enum SearchRequestType {
    SEARCH,
    PAGINATION,
}

enum SearchRequestStatusOptions {
    SENDING,
    LOADING,
    SUCCESS,
    BAD_REQUEST,
    CONNECTION_ERROR,
    BAD_QUERY,
    TOO_MANY_REQUESTS,
}

interface ManticoreSearchHits {
    maxScore?: number;
    total?: number;
    totalRelation?: string;
    hits?: Book[];
}

interface ManticoreSearchResponse {
    aggregations?: object;
    took: number;
    hits: ManticoreSearchHits;
    warning: object;
}

interface SearchRequestStatus {
    type: SearchRequestType;
    status: SearchRequestStatusOptions;
}

export { SearchRequestType, SearchRequestStatusOptions };

export type {
    SearchRequestStatus,
    ManticoreSearchResponse,
    ManticoreSearchHits,
};
