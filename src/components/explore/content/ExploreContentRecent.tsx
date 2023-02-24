import { useTranslation } from "react-i18next";
import { Metadata } from "../../general/helpers/generalTypes";
import { useEffect, useRef, useState } from "react";
import makeSearch from "../../search/helpers/makeSearch";
import ExploreContentPagination from "./ExploreContentPagination";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import BlankLoadingSpinner from "../../general/BlankLoadingSpinner";
import { getMetadataInfoPath } from "../../general/helpers/generalFunctions";
import ExploreContentFigure from "./ExploreContentFigure";
import { ManticoreSearchResponse } from "../../search/helpers/searchTypes";
import useSlicedMetadatas from "../../general/helpers/useSlicedMetadatas";
import { useWindowSize } from "../../general/helpers/useWindowSize";

function buildRecentSearchObject() {
    const searchObject = {
        index: "libgen",
        query: {
            query_string: "",
        },
        sort: [
            {
                timeadded: "desc",
            },
        ],
        limit: 100,
    };
    return searchObject;
}

export default function ExploreContentRecent() {
    const recentSearchObject = buildRecentSearchObject();
    const { t } = useTranslation();
    const { width } = useWindowSize();
    const [requestError, setRequestError] = useState<boolean>(false);
    const [requestDone, setRequestDone] = useState<boolean>(false);

    // IMPORTANT: This counts the total items available in the ManticoreIndex.
    // Not to be confused with the length of the search result.
    // Do NOT use this to set the page count.
    const totalItems = useRef<number>(0);
    const recentContent = useRef<ManticoreSearchResponse | undefined>(
        undefined
    );
    const [visibleContent, setVisibleContent] = useState<Metadata[]>([]);

    let itemsPerRow = 6;
    if (width < 768) {
        itemsPerRow = 2;
    } else if (width < 992) {
        itemsPerRow = 3;
    }

    const slicedContent = useSlicedMetadatas(visibleContent, itemsPerRow);

    // Pagination
    const [pageCount, setPageCount] = useState<number>(0);
    const itemsPerPage = 24;
    const bootstrapColSize = 12;

    const handlePageClick = (evt: any) => {
        if (recentContent.current == undefined) {
            return;
        }
        const searchHits = recentContent.current.hits.hits;
        if (searchHits == undefined || searchHits.length === 0) {
            return;
        }
        const newOffset = (evt.selected * itemsPerPage) % searchHits.length;
        setVisibleContent(
            searchHits.slice(newOffset, newOffset + itemsPerPage)
        );
    };

    const renderRecentContent = () => {
        if (!requestDone) {
            return <BlankLoadingSpinner />;
        } else if (requestError) {
            return <p>Nenhum resultado encontrado.</p>;
        } else if (visibleContent.length > 0 && slicedContent.length > 0) {
            return slicedContent.map((metadatas, rowIndex) => {
                return (
                    <MDBRow
                        key={rowIndex}
                        className="d-flex flex-nowrap w-100 gx-2"
                    >
                        {metadatas.map((metadata, eleIndex) => {
                            const href = getMetadataInfoPath(
                                metadata.topic,
                                metadata.md5
                            );
                            return (
                                <MDBCol
                                    size={Math.ceil(
                                        bootstrapColSize / itemsPerRow
                                    )}
                                    key={eleIndex}
                                >
                                    <ExploreContentFigure
                                        metadata={metadata}
                                        href={href}
                                    />
                                </MDBCol>
                            );
                        })}
                    </MDBRow>
                );
            });
        }
    };

    useEffect(() => {
        makeSearch(recentSearchObject).then((response) => {
            if (response) {
                setRequestDone(true);
                console.log(response);
                recentContent.current = response;
                if (recentContent.current == null) {
                    return;
                }

                const searchHits = recentContent.current.hits.hits;
                if (searchHits == undefined || searchHits.length === 0) {
                    setRequestError(true);
                    setRequestDone(true);
                    return;
                }

                const itemsOnindex = recentContent.current.hits.total;
                if (itemsOnindex) {
                    totalItems.current = itemsOnindex;
                }
                const paginableItems = searchHits.length;
                setVisibleContent(searchHits.slice(0, itemsPerPage));
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                setPageCount(Math.ceil(paginableItems / itemsPerPage));
            }
        });
    }, []);

    return (
        <MDBContainer fluid className="p-1">
            {renderRecentContent()}
            <div className="d-flex w-100">
                <ExploreContentPagination
                    pageChangeHandler={handlePageClick}
                    pageCount={pageCount}
                />
            </div>
        </MDBContainer>
    );
}
