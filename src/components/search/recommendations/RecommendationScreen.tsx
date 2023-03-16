import Break from "../../general/Break";
import LibraryBookFigure from "../../library/figure/LibraryBookFigure";
import { useEffect, useMemo, useState } from "react";
import { Metadata } from "../../general/helpers/generalTypes";
import axios from "axios";
import RecommendationBookFigure from "./RecommendationBookFigure";
import { useTranslation } from "react-i18next";
import recommendationsPT from "./locale/recommendationsPT.json";
import recommendationsEN from "./locale/recommendationsEN.json";
import { useWindowSize } from "../../general/helpers/useWindowSize";
import useSlicedMetadatas from "../../general/helpers/useSlicedMetadatas";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";

interface Props {
    disabled: boolean;
}

export default function RecommendationScreen(props: Props) {
    const { width } = useWindowSize();
    const { t, i18n } = useTranslation();
    const localizedRecommendations = useMemo(() => {
        const lang = i18n.language;
        if (lang === "pt" || lang === "pt-br") {
            return recommendationsPT["entries"] as Metadata[];
        } else if (lang === "en" || lang === "en-us") {
            return recommendationsEN["entries"] as Metadata[];
        } else {
            return recommendationsPT["entries"] as Metadata[];
        }
    }, [i18n.language]);

    let itemsPerRow = 4;
    if (width < 768) {
        itemsPerRow = 2;
    } else if (width < 992) {
        itemsPerRow = 3;
    }

    const slicedRecommendations = useSlicedMetadatas(
        localizedRecommendations,
        itemsPerRow
    );

    const renderRecommendations = () => {
        if (slicedRecommendations.length === 0) {
            return null;
        }
        let internalCounter = 1;
        return slicedRecommendations.map((row, rowIndex) => {
            return (
                <MDBRow key={rowIndex} className="d-flex">
                    {row.map((metadata, eleIndex) => {
                        internalCounter++;
                        const timeout = internalCounter * 250;
                        return (
                            <MDBCol
                                key={eleIndex}
                                size={Math.ceil(12 / itemsPerRow)}
                                className="gx-1"
                            >
                                <RecommendationBookFigure
                                    metadata={metadata}
                                    timeout={timeout}
                                />
                            </MDBCol>
                        );
                    })}
                </MDBRow>
            );
        });
    };

    return (
        <>
            {!props.disabled ? (
                <div className="d-flex flex-wrap justify-content-center mb-4">
                    <div className="p-2 rounded-3 text-dark recommendation-div">
                        <div className="d-flex flex-wrap justify-content-center mb-2">
                            <span className="recommendation-title">
                                {t("search:recomendaesDoEditor")}
                            </span>
                        </div>
                        <Break />
                        <MDBContainer fluid className="recommendation-div">
                            {renderRecommendations()}
                        </MDBContainer>
                    </div>
                </div>
            ) : null}
        </>
    );
}
