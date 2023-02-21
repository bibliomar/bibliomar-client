import Break from "../../general/Break";
import LibraryBookFigure from "../../library/figure/LibraryBookFigure";
import { useEffect, useState } from "react";
import { Metadata } from "../../general/helpers/generalTypes";
import axios from "axios";
import RecommendationBookFigure from "./RecommendationBookFigure";
import { useTranslation } from "react-i18next";

interface Props {
    disabled: boolean;
}

// Hard-coded stuff
// We actually only need the authors and name parameters for the recommendations.
// You can just copy-paste a search result here:
// The md5 is needed for the cover. the topic helps to filter the search.
// All the rest is optional.
// TODO: Improve this and use actual statistics to generate recommendations.

// noinspection AllyPlainJsInspection
const recommendations: Metadata[] = [
    {
        author: "Daniel, Keyes",
        title: "Flores Para Algernon",
        md5: "6DC5A0A601B78CECFFC5EDE2538A8127",
        topic: "fiction",
        coverUrl: "2065000/598f0272a08201bb83f56d6fb512e987.jpg",
    },
    {
        author: "Rothfuss, Patrick",
        title: "O Nome do Vento",
        md5: "7FA001B7F7A4CE3316036D1F6A3CBF47",
        topic: "fiction",
        coverUrl: "817000/7fa001b7f7a4ce3316036d1f6a3cbf47.jpg",
    },
    {
        author: "Amado, Jorge",
        title: "Seara vermelha",
        md5: "7061F3E26D53E300FD64A77EE1865F23",
        topic: "fiction",
    },
    {
        author: "Sanderson, Brandon",
        title: "O Império Final",
        md5: "C14CDF822286598C7A15032616563673",
        topic: "fiction",
    },
    {
        title: "Capitães da areia",
        author: "Amado, Jorge",
        md5: "DB8C472C3261938D7591D7AE30879046",
        language: "Portuguese",
        topic: "fiction",
        coverUrl: "1268000/db8c472c3261938d7591d7ae30879046.jpg",
    },
];

export default function RecommendationScreen(props: Props) {
    const { t } = useTranslation();
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
                        <div className="d-flex flex-wrap justify-content-center w-100">
                            {recommendations.map((el, i) => {
                                let timeout;
                                i === 0 ? (timeout = 750) : (timeout = i * 750);
                                return (
                                    <RecommendationBookFigure
                                        metadata={el}
                                        timeout={timeout}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
