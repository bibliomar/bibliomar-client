import { Metadata, LibraryCategories } from "../general/helpers/generalTypes";
import React, { useContext, useMemo } from "react";
import LibraryBookFigure from "./figure/LibraryBookFigure";
import Break from "../general/Break";
import {
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { Filters } from "./helpers/libraryContext";
import {
    bookCategorySetter,
    bookFiltering,
    defaultFilters,
} from "./helpers/libraryFunctions";
import equal from "fast-deep-equal/es6";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "../general/helpers/useWindowSize";
import useSlicedMetadatas from "../general/helpers/useSlicedMetadatas";

interface Props {
    title: string;
    message: string;
    metadataCategory: LibraryCategories;
    metadata: Metadata[];
}

export default function LibraryMinimalCategory({
    title,
    message,
    metadataCategory,
    metadata,
}: Props) {
    const filtersContext = useContext(Filters);
    const { t } = useTranslation();
    const { width } = useWindowSize();

    const onDefaultFilters = useMemo(() => {
        return equal(filtersContext.filters, defaultFilters);
    }, [metadata, filtersContext.filters]);

    const filteredMetadatas = useMemo(() => {
        return bookFiltering(metadata, filtersContext.filters);
    }, [metadata, filtersContext.filters]);

    // The number of items per row will be different depending on the screen size.
    let itemsPerRow = 6;
    if (width < 768) {
        itemsPerRow = 2;
    } else if (width < 1024) {
        itemsPerRow = 3;
    }
    const maxVisibleRows = 3;
    const maxVisibleItems = itemsPerRow * maxVisibleRows;

    // The list of slices to be rendered.
    // They will be rendered using MDBootstrap grid system.
    const slicedMetadataList = useSlicedMetadatas(
        filteredMetadatas,
        itemsPerRow
    );

    return (
        <div className="d-flex flex-row flex-wrap justify-content-start basic-container w-100 mb-4 p-3">
            <div className="d-flex flex-wrap justify-content-md-start w-100 mb-3">
                <div className="d-flex flex-wrap">
                    <MDBTooltip title={message} tag={"span"} placement={"auto"}>
                        <span className="fw-bold lead">{title}</span>
                    </MDBTooltip>
                </div>

                <Link to={metadataCategory} className="ms-auto">
                    <MDBIcon
                        fas
                        icon="plus-square"
                        className="text-accent"
                        size={"2x"}
                    />
                </Link>

                <Break />
                {filteredMetadatas.length > maxVisibleItems && (
                    <span className="text-muted">
                        Mostrando <strong>{maxVisibleItems}</strong> livros de{" "}
                        {filteredMetadatas.length}
                    </span>
                )}
            </div>
            <Break />
            <div className="d-flex flex-wrap w-100">
                <MDBContainer fluid>
                    {slicedMetadataList.map((metadataSlice, sliceIndex) => {
                        let internalCounter = 0;
                        if (sliceIndex > maxVisibleRows - 1) {
                            return null;
                        }
                        return (
                            <MDBRow key={sliceIndex}>
                                {metadataSlice.map((metadata, entryIndex) => {
                                    internalCounter++;
                                    const timeout = internalCounter * 750;
                                    return (
                                        <MDBCol
                                            key={entryIndex}
                                            size={`${12 / itemsPerRow}`}
                                            className="gx-2"
                                        >
                                            <LibraryBookFigure
                                                metadata={metadata}
                                                timeout={timeout}
                                            />
                                        </MDBCol>
                                    );
                                })}
                            </MDBRow>
                        );
                    })}
                </MDBContainer>

                <Break />
                {filteredMetadatas.length === 0 ? (
                    <div className="d-flex justify-content-center w-100 mb-3">
                        {onDefaultFilters ? (
                            <span>
                                {t("library:vazioQueTalAdicionarAlgumLivro")}
                            </span>
                        ) : (
                            <span>
                                {t(
                                    "library:nenhumLivroCorrespondeAosFiltrosSelecionados"
                                )}
                            </span>
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    );
}
