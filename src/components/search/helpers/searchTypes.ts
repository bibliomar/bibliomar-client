import { Metadata } from "../../general/helpers/generalTypes";

interface SearchFormFields {
    q: string;
    type: string;
    format: string;
    language: string;
    topic: string;
    fulltext: boolean;
}

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
    hits?: Metadata[];
}

interface ManticoreSearchResponse {
    aggregations?: object;
    took: number;
    hits?: ManticoreSearchHits;
    warning: object;
}

interface SearchRequestStatus {
    type: SearchRequestType;
    status: SearchRequestStatusOptions;
}

export { SearchRequestType, SearchRequestStatusOptions };

export type {
    SearchFormFields,
    SearchRequestStatus,
    ManticoreSearchResponse,
    ManticoreSearchHits,
};
