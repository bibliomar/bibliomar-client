import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
} from "mdb-react-ui-kit";
import axios, { AxiosRequestConfig } from "axios";
import {
    getMetadataInfoPath,
    serverUrl,
} from "../../general/helpers/generalFunctions";
import {
    Metadata,
    StatisticsTopResponse,
} from "../../general/helpers/generalTypes";
import { useEffect, useRef, useState } from "react";
import ExploreContentPagination from "./ExploreContentPagination";
import { useWindowSize } from "../../general/helpers/useWindowSize";
import useSlicedMetadatas from "../../general/helpers/useSlicedMetadatas";
import BlankLoadingSpinner from "../../general/BlankLoadingSpinner";
import MetadataHoverableFigure from "../../general/figure/MetadataHoverableFigure";
import ExploreContentFigure from "./ExploreContentFigure";
import { useTranslation } from "react-i18next";

async function getTopContent(by?: "downloads" | "views") {
    let requestUrl = `${serverUrl}/statistics/top`;
    switch (by) {
        case "downloads":
            requestUrl += "/downloads";
            break;
        case "views":
            requestUrl += "/views";
            break;
    }
    requestUrl += "?limit=50";

    const config: AxiosRequestConfig<StatisticsTopResponse[] | undefined> = {
        method: "GET",
        url: requestUrl,
    };
    try {
        const req = await axios.request(config);
        const data: StatisticsTopResponse[] = req.data;
        console.log(data);
        return data;
    } catch (e: any) {
        console.error(e);
        return undefined;
    }
}

function getMetadatasFromResponse(
    response: StatisticsTopResponse[]
): Metadata[] {
    const metadatas: Metadata[] = [];
    for (const item of response) {
        metadatas.push(item.metadata);
    }
    return metadatas;
}

export default function ExploreContentPopular() {
    const { t } = useTranslation();
    const { width } = useWindowSize();
    const [requestError, setRequestError] = useState<boolean>(false);
    const [requestDone, setRequestDone] = useState<boolean>(true);
    const topContent = useRef<StatisticsTopResponse[]>([]);
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
    const itemsPerPage = 12;
    const bootstrapColSize = 12;

    const handlePageClick = (evt: any) => {
        const newOffset =
            (evt.selected * itemsPerPage) % topContent.current.length;
        const metadatas = getMetadatasFromResponse(topContent.current);
        setVisibleContent(metadatas.slice(newOffset, newOffset + itemsPerPage));
    };

    const renderTopContent = () => {
        let internalCounter = 0;
        if (!requestDone) {
            return <BlankLoadingSpinner />;
        } else if (requestError) {
            return <p>{t("explore:nenhumResultadoEncontrado")}</p>;
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
                            internalCounter++;
                            const timeout = internalCounter * 1000;
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
                                        timeout={timeout}
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
        getTopContent()
            .then((res) => {
                if (res) {
                    console.log(res);
                    topContent.current = res;
                    const metadatasFromResponse = getMetadatasFromResponse(
                        topContent.current
                    );
                    setVisibleContent(
                        metadatasFromResponse.slice(0, itemsPerPage)
                    );

                    const pageCount = Math.ceil(
                        topContent.current.length / itemsPerPage
                    );
                    setPageCount(pageCount);
                } else {
                    setRequestError(true);
                }
                setRequestDone(true);
            })
            .catch((e: any) => {
                console.error(e);
                setRequestError(true);
                setRequestDone(true);
            });
    }, []);

    return (
        <MDBContainer fluid className="p-1">
            {renderTopContent()}
            {slicedContent.length > 0 ? (
                <div className="d-flex w-100">
                    <ExploreContentPagination
                        pageChangeHandler={handlePageClick}
                        pageCount={pageCount}
                    />
                </div>
            ) : null}
        </MDBContainer>
    );
}
