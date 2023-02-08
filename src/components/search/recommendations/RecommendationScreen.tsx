import Break from "../../general/Break";
import LibraryBookFigure from "../../library/LibraryBookFigure";
import { useEffect, useState } from "react";
import { Book } from "../../general/helpers/generalTypes";
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
const recommendations: Book[] = [
    {
        authors: "Daniel, Keyes",
        title: "Flores Para Algernon",
        md5: "6DC5A0A601B78CECFFC5EDE2538A8127",
        topic: "fiction",
    },
    {
        authors: "Rothfuss, Patrick",
        title: "O Nome do Vento",
        md5: "7FA001B7F7A4CE3316036D1F6A3CBF47",
        topic: "fiction",
    },
    {
        authors: "Amado, Jorge",
        title: "Seara vermelha",
        md5: "7061F3E26D53E300FD64A77EE1865F23",
        topic: "fiction",
    },
    {
        authors: "Sanderson, Brandon",
        title: "O Império Final",
        md5: "C14CDF822286598C7A15032616563673",
        topic: "fiction",
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
                                i === 0
                                    ? (timeout = 1000)
                                    : (timeout = i * 1000);
                                return (
                                    <>
                                        {i % 4 === 0 ? (
                                            <Break desktop />
                                        ) : i % 2 === 0 ? (
                                            <Break mobile />
                                        ) : null}
                                        <RecommendationBookFigure
                                            book={el}
                                            timeout={timeout}
                                        />
                                    </>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
