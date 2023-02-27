import Break from "../general/Break";
import LibraryBookFigure from "./figure/LibraryBookFigure";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Metadata, LibraryCategories } from "../general/helpers/generalTypes";
import { Filters } from "./helpers/libraryContext";
import equal from "fast-deep-equal/es6";
import {
    bookCategorySetter,
    bookFiltering,
    defaultFilters,
} from "./helpers/libraryFunctions";
import {
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Paginator from "../general/Paginator";
import LibraryPagination from "./pagination/LibraryPagination";
import { Trans, useTranslation } from "react-i18next";
import { useWindowSize } from "../general/helpers/useWindowSize";
import useSlicedMetadatas from "../general/helpers/useSlicedMetadatas";

interface Props {
    title: string;
    metadataCategory: LibraryCategories;
    metadatas: Metadata[];
}

export default function LibraryExpandedCategory({
    title,
    metadataCategory,
    metadatas,
}: Props) {
    const filtersContext = useContext(Filters);
    const { t } = useTranslation();
    const { width } = useWindowSize();

    const onDefaultFilters = useMemo(() => {
        return equal(filtersContext.filters, defaultFilters);
    }, [metadatas, filtersContext.filters]);

    const filteredMetadatadas = useMemo(() => {
        return bookFiltering(metadatas, filtersContext.filters);
    }, [metadatas, filtersContext.filters]);

    const itemsPerPage = 12;
    const [itemOffset, setItemOffset] = useState(0);
    const [visibleMetadata, setVisibleMetadata] = useState<Metadata[]>([]);
    const [pageCount, setPageCount] = useState(0);

    // The number of items per row will be different depending on the screen size.
    let itemsPerRow = 6;
    if (width < 768) {
        itemsPerRow = 2;
    } else if (width < 1024) {
        itemsPerRow = 3;
    }

    // The list of slices to be rendered.
    // They will be rendered using MDBootstrap grid system.
    const slicedMetadataList = useSlicedMetadatas(
        filteredMetadatadas,
        itemsPerRow
    );

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setPageCount(Math.ceil(filteredMetadatadas.length / itemsPerPage));
        setVisibleMetadata(filteredMetadatadas.slice(itemOffset, endOffset));
    }, [filteredMetadatadas, itemOffset]);

    const pageChangeHandler = (evt: any) => {
        const newOffset =
            (evt.selected * itemsPerPage) % filteredMetadatadas.length;
        setItemOffset(newOffset);
        setVisibleMetadata(
            filteredMetadatadas.slice(newOffset, newOffset + itemsPerPage)
        );
    };

    return (
        <div className="d-flex flex-row flex-wrap justify-content-start basic-container w-100 mb-4 p-3">
            <div className="d-flex flex-wrap justify-content-md-start justify-content-center w-100 mb-3">
                <div className="d-flex flex-wrap w-100">
                    <span className="fw-bold lead">{title}</span>
                    <Link to={"/library"} className="ms-auto">
                        <MDBIcon
                            fas
                            icon="caret-square-left"
                            className="text-accent"
                            size={"2x"}
                        />
                    </Link>
                    <Break className="mb-1" />
                    <span className="text-muted">
                        <Trans
                            ns={"library"}
                            i18nKey="livrosNessaCategoria"
                            values={{
                                length: filteredMetadatadas.length,
                            }}
                            components={{
                                s: <strong />,
                            }}
                        />
                    </span>
                </div>

                <Break />
            </div>
            <Break />
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start  w-100">
                <MDBContainer fluid>
                    {slicedMetadataList.map((metadataSlice, sliceIndex) => {
                        let internalCounter = 0;
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
                {metadatas.length === 0 && (
                    <div className="d-flex justify-content-center w-100 mb-3">
                        {onDefaultFilters ? (
                            <span>
                                {t("library:vazioQueTalAdicionarAlgumLivro2")}
                            </span>
                        ) : (
                            <span>
                                {t(
                                    "library:nenhumLivroCorrespondeAosFiltrosSelecionados2"
                                )}
                            </span>
                        )}
                    </div>
                )}

                <Break />
                {visibleMetadata.length > 0 ? (
                    <LibraryPagination
                        pageChangeHandler={pageChangeHandler}
                        pageCount={pageCount}
                    />
                ) : null}
            </div>
        </div>
    );
}