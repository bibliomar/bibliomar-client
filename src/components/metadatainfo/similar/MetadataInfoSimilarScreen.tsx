import { Metadata } from "../../general/helpers/generalTypes";
import Break from "../../general/Break";
import { MDBContainer } from "mdb-react-ui-kit";
import BlankLoadingSpinner from "../../general/BlankLoadingSpinner";
import SimpleBookFigure from "../../general/figure/SimpleBookFigure";
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
    let finalQuery: string;

    let authorQuery = "";
    let seriesQuery = "";

    if (series != undefined && series !== "") {
        seriesQuery = `(${sanitizeSeriesParameter(series)})`;
    }
    if (author != undefined && author !== "") {
        authorQuery = `(${author})`;
    }

    if (seriesQuery !== "" && authorQuery !== "") {
        finalQuery = `${seriesQuery} | ${authorQuery}`;
    } else {
        finalQuery = seriesQuery !== "" ? seriesQuery : authorQuery;
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
        ManticoreSearchResponse | undefined
    >(undefined);
    const [searchDone, setSearchDone] = useState(false);

    useEffect(() => {
        const searchObject = buildSimilarSearchObject(metadata);
        if (searchObject == undefined) {
            return;
        }
        setSearchDone(false);
        setSearchResults(undefined);
        const search = makeSearch(searchObject);
        search
            .then((results) => {
                if (results == undefined) {
                    setSearchResults(undefined);
                    setSearchDone(true);
                    return;
                }

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
            return <p>Erro na busca por arquivos semelhantes.</p>;
        } else {
            const searchHits = searchResults.hits.hits;
            if (searchHits == undefined || searchHits.length === 0) {
                return null;
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
