import SearchResultsContent from "./SearchResultsContent";
import React, { SetStateAction } from "react";
import SearchPagination from "../SearchPagination";
import Break from "../../general/Break";
import { Metadata } from "../../general/helpers/generalTypes";
import { SearchRequestStatus } from "../helpers/searchTypes";
import SearchMessageScreen from "../loading/SearchMessageScreen";
import { el } from "date-fns/locale";
import useSlicedMetadatas from "../../general/helpers/useSlicedMetadatas";
import { useWindowSize } from "../../general/helpers/useWindowSize";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import SearchFigure from "./SearchFigure";

interface ResultScreenProps {
    visibleResults: Metadata[];
    itemsPerRow: number;
}

export default function SearchResults({
    visibleResults,
    itemsPerRow,
}: ResultScreenProps) {
    const { width } = useWindowSize();
    const bootstrapColSize = 12;

    const slicedResults = useSlicedMetadatas(visibleResults, itemsPerRow);
    const shouldFlexCenter = slicedResults.length < 2;

    const renderResultFigures = () => {
        return (
            <MDBContainer
                fluid
                className="d-flex flex-wrap justify-content-center"
            >
                {slicedResults.map((row, rowIndex) => {
                    return (
                        <MDBRow
                            className={`d-flex ${
                                shouldFlexCenter
                                    ? "justify-content-center"
                                    : "justify-content-start"
                            } w-100`}
                            key={rowIndex}
                        >
                            {row.map((ele, eleIndex) => {
                                const timeout = (rowIndex + eleIndex + 1) * 500;
                                return (
                                    <MDBCol
                                        size={bootstrapColSize / itemsPerRow}
                                        className="gx-2 gx-lg-3"
                                        key={eleIndex}
                                    >
                                        <SearchFigure
                                            metadata={ele}
                                            timeout={timeout}
                                        />
                                    </MDBCol>
                                );
                            })}
                        </MDBRow>
                    );
                })}
            </MDBContainer>
        );
    };

    const renderBasedOnResults = () => {
        if (visibleResults.length === 0 || slicedResults.length === 0) {
            return null;
        } else {
            return renderResultFigures();
        }
    };
    return (
        <div className="d-flex flex-wrap justify-content-center w-100">
            {renderBasedOnResults()}
        </div>
    );
}
