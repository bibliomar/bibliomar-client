import { Metadata } from "../../general/helpers/generalTypes";
import Break from "../../general/Break";
import { MDBContainer } from "mdb-react-ui-kit";
import BlankLoadingSpinner from "../../general/BlankLoadingSpinner";
import MetadataSelectableFigure from "../../general/figure/MetadataSelectableFigure";
import { useEffect, useMemo, useState } from "react";
import useSlicedMetadatas from "../../general/helpers/useSlicedMetadatas";
import { useWindowSize } from "../../general/helpers/useWindowSize";
import MetadataInfoSimilarResults from "./MetadataInfoSimilarResults";
import { useTranslation } from "react-i18next";
import { ManticoreSearchResponse } from "../../search/helpers/searchTypes";
import makeSearch from "../../search/helpers/makeSearch";

interface MetadataInfoSimilarScreenProps {
    metadata: Metadata;
}

function removeTargetMd5(targetMd5: string, metadatas: Metadata[]) {
    return metadatas.filter((metadata) => metadata.md5 !== targetMd5);
}

function sanitizeSeriesParameter(series: string) {
    return series.replace(/[^\s\wãõâôç]|\d/gm, "");
}

function buildSimilarSearchObject(metadata: Metadata) {
    const series = metadata.series;
    const author = metadata.author;
    const language = metadata.language;
    if (!series && !author) {
        return undefined;
    }
    let finalQuery: string | undefined;

    let authorQuery: string | undefined;
    let seriesQuery: string | undefined;

    if (series != undefined && series.trim() !== "") {
        const sanitizedSeries = sanitizeSeriesParameter(series);
        if (sanitizedSeries !== undefined && sanitizedSeries.trim() !== "") {
            seriesQuery = `(${sanitizeSeriesParameter(series)})`;
        }
    }
    if (author != undefined && author.trim() !== "") {
        authorQuery = `(${author})`;
    }

    if (seriesQuery != undefined && authorQuery != undefined) {
        finalQuery = `${seriesQuery} | ${authorQuery}`;
    } else if (seriesQuery != undefined && seriesQuery.trim() !== "") {
        finalQuery = seriesQuery;
    } else if (authorQuery != undefined && authorQuery.trim() !== "") {
        finalQuery = authorQuery;
    } else {
        finalQuery = undefined;
    }

    if (finalQuery == undefined || finalQuery.trim() === "") {
        return undefined;
    }

    if (language != undefined) {
        finalQuery = finalQuery + ` ${language}`;
    }

    finalQuery = finalQuery.trim();

    const searchObject = {
        index: "libgen",
        query: {
            query_string: finalQuery,
        },
        limit: 12,
    };

    return searchObject;
}

/**
 * The component responsible for searching and rendering similar books.
 */
export default function MetadataInfoSimilarScreen({
    metadata,
}: MetadataInfoSimilarScreenProps) {
    const { t } = useTranslation();

    const [searchResults, setSearchResults] = useState<
        ManticoreSearchResponse | undefined | null
    >(undefined);
    const [searchDone, setSearchDone] = useState(false);

    useEffect(() => {
        const searchObject = buildSimilarSearchObject(metadata);
        if (searchObject == undefined) {
            setSearchResults(undefined);
            setSearchDone(true);
            return;
        }
        setSearchDone(false);
        setSearchResults(undefined);

        makeSearch(searchObject)
            .then((results) => {
                console.log(results);
                setSearchResults(results);
                setSearchDone(true);
            })
            .catch((err) => {
                console.error(err);
                setSearchResults(undefined);
                setSearchDone(true);
            });
    }, [metadata]);

    const renderResults = () => {
        if (metadata.author == undefined && metadata.series == undefined) {
            return null;
        }

        if (!searchDone) {
            return (
                <div className="mb-3">
                    <BlankLoadingSpinner />
                </div>
            );
        } else if (searchResults == undefined) {
            return <p>{t("metadatainfo:erroNaBuscaPorArquivosSemelhantes")}</p>;
        } else {
            if (
                searchResults.hits == undefined ||
                searchResults.hits.hits == undefined
            ) {
                return <p>{t("metadatainfo:nenhumItemEncontrado")}</p>;
            }
            const searchHits = searchResults.hits.hits;
            if (searchHits == undefined || searchHits.length === 0) {
                return <p>{t("metadatainfo:nenhumItemEncontrado")}</p>;
            }
            if (removeTargetMd5(metadata.md5, searchHits).length === 0) {
                return <p>{t("metadatainfo:nenhumItemEncontrado2")}</p>;
            }
            const sanitizedHits = removeTargetMd5(metadata.md5, searchHits);

            return <MetadataInfoSimilarResults metadatas={sanitizedHits} />;
        }
    };

    return (
        <MDBContainer fluid>
            <div className="d-flex flex-wrap w-100 justify-content-start simple-text">
                <h4
                    className="book-info-description mb-3 ms-2 ms-lg-0"
                    style={{ fontWeight: 700 }}
                >
                    {t("metadatainfo:livrosSemelhantes")}
                </h4>
                <Break />
                {renderResults()}
            </div>
        </MDBContainer>
    );
}
