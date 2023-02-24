import Break from "../../general/Break";
import LibraryBookFigure from "../../library/figure/LibraryBookFigure";
import { useEffect, useMemo, useState } from "react";
import { Metadata } from "../../general/helpers/generalTypes";
import axios from "axios";
import RecommendationBookFigure from "./RecommendationBookFigure";
import { useTranslation } from "react-i18next";
import recommendationsPT from "./locale/recommendationsPT.json";
import recommendationsEN from "./locale/recommendationsEN.json";

interface Props {
    disabled: boolean;
}

export default function RecommendationScreen(props: Props) {
    const { t, i18n } = useTranslation();
    const localizedRecommendations = useMemo(() => {
        const lang = i18n.language;
        if (lang === "pt" || lang === "pt-br") {
            return recommendationsPT["entries"] as Metadata[];
        } else if (lang === "en" || lang === "en-us") {
            return recommendationsEN["entries"] as Metadata[];
        }
    }, [i18n.language]);
    return (
        <>
            {!props.disabled ? (
                <div className="d-flex flex-wrap justify-content-center">
                    <div className="p-2 rounded-3 text-dark recommendation-div">
                        <div className="d-flex flex-wrap justify-content-center mb-2">
                            <span className="recommendation-title">
                                {t("search:recomendaesDoEditor")}
                            </span>
                        </div>
                        <Break />
                        {localizedRecommendations != undefined ? (
                            <div className="d-flex flex-wrap justify-content-center w-100">
                                {localizedRecommendations.map((el, i) => {
                                    let timeout;
                                    i === 0
                                        ? (timeout = 750)
                                        : (timeout = i * 750);
                                    return (
                                        <RecommendationBookFigure
                                            metadata={el}
                                            timeout={timeout}
                                        />
                                    );
                                })}
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : null}
        </>
    );
}
