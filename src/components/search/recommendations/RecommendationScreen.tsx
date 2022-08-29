import BookFigure from "../results/BookFigure";
import RecommendationBookFigure from "./RecommendationBookFigure";
import Break from "../../general/Break";
import LibraryBookFigure from "../../library/LibraryBookFigure";
import { Book } from "../../general/helpers/generalTypes";

interface Props {
    disabled: boolean;
}
// Hard-coded stuff
const recommendationOptions: Book[] = [
    {
        authors: "Daniel, Keyes",
        series: "",
        title: "Flores Para Algernon",
        language: "Portuguese",
        file: "EPUB / 269 Kb",
        mirror1: "http://library.lol/fiction/6DC5A0A601B78CECFFC5EDE2538A8127",
        mirror2:
            "https://library.bz/fiction/edit/6DC5A0A601B78CECFFC5EDE2538A8127",
        md5: "6DC5A0A601B78CECFFC5EDE2538A8127",
        topic: "fiction",
        extension: "epub",
        size: "269 Kb",
    },
    {
        authors: "Rothfuss, Patrick",
        series: "",
        title: "O Nome do Vento",
        language: "Portuguese",
        file: "EPUB / 1.06 Mb",
        mirror1: "http://library.lol/fiction/7FA001B7F7A4CE3316036D1F6A3CBF47",
        mirror2:
            "https://library.bz/fiction/edit/7FA001B7F7A4CE3316036D1F6A3CBF47",
        md5: "7FA001B7F7A4CE3316036D1F6A3CBF47",
        topic: "fiction",
        extension: "epub",
        size: "1.06 Mb",
    },
    {
        authors: "Amado, Jorge",
        series: "",
        title: "Seara vermelha",
        language: "Portuguese",
        file: "EPUB / 780 Kb",
        mirror1: "http://library.lol/fiction/7061F3E26D53E300FD64A77EE1865F23",
        mirror2:
            "https://library.bz/fiction/edit/7061F3E26D53E300FD64A77EE1865F23",
        md5: "7061F3E26D53E300FD64A77EE1865F23",
        topic: "fiction",
        extension: "epub",
        size: "780 Kb",
    },
    {
        authors: "Sanderson, Brandon",
        series: "Mistborn – Nascidos da Bruma 1",
        title: "O Império Final",
        language: "Portuguese",
        file: "EPUB / 1.43 Mb",
        mirror1: "http://library.lol/fiction/C14CDF822286598C7A15032616563673",
        mirror2:
            "https://library.bz/fiction/edit/C14CDF822286598C7A15032616563673",
        md5: "C14CDF822286598C7A15032616563673",
        topic: "fiction",
        extension: "epub",
        size: "1.43 Mb",
    },
];

export default function RecommendationScreen(props: Props) {
    const renderBasedOnDisabled = () => {
        if (props.disabled) {
            return null;
        }
        return (
            <div className="d-flex flex-wrap justify-content-center">
                <div className="p-2 rounded-3 text-dark recommendation-div">
                    <div className="d-flex flex-wrap justify-content-center mb-2">
                        <span className="recommendation-title">
                            Recomendações do editor
                        </span>
                    </div>
                    <Break />
                    <div className="d-flex flex-wrap justify-content-center">
                        {recommendationOptions.map((el, i) => {
                            let timeout;
                            i === 0 ? (timeout = 1000) : (timeout = i * 1000);
                            return (
                                <LibraryBookFigure
                                    book={el}
                                    timeout={timeout}
                                    key={i}
                                    expanded
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    return <>{renderBasedOnDisabled()}</>;
}
