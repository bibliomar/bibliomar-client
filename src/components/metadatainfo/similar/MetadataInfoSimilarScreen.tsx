import { Metadata } from "../../general/helpers/generalTypes";
import Break from "../../general/Break";
import { MDBContainer } from "mdb-react-ui-kit";
import useSearch from "../../general/helpers/useSearch";
import BlankLoadingSpinner from "../../general/BlankLoadingSpinner";
import SimpleBookFigure from "../../general/figure/SimpleBookFigure";
import { useMemo } from "react";
import useSlicedMetadatas from "../../general/helpers/useSlicedMetadatas";
import { useWindowSize } from "../../general/helpers/useWindowSize";
import MetadataInfoSimilarResults from "./MetadataInfoSimilarResults";

interface MetadataInfoSimilarScreenProps {
    metadata: Metadata;
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
    // Make sure to use useMemo to avoid infinite looping on the useSearch hook.
    const searchObject = useMemo(
        () => buildSimilarSearchObject(metadata),
        [metadata]
    );
    const search = useSearch(searchObject);

    const renderResults = () => {
        if (metadata.author == undefined) {
            return null;
        }

        if (search.searchLoading) {
            return <BlankLoadingSpinner />;
        } else if (search.searchError) {
            return <p>Erro na busca por arquivos semelhantes.</p>;
        } else if (search.searchResults) {
            const searchHits = search.searchResults.hits.hits;
            if (searchHits == undefined || searchHits.length === 0) {
                return null;
            }

            return <MetadataInfoSimilarResults metadatas={searchHits} />;
        }
    };

    return (
        <MDBContainer fluid>
            <div className="d-flex flex-wrap w-100 simple-text">
                <h4
                    className="book-info-description mb-2"
                    style={{ fontWeight: 700 }}
                >
                    Livros semelhantes
                </h4>
                <div className="d-flex w-100">{renderResults()}</div>
            </div>
        </MDBContainer>
    );
}
