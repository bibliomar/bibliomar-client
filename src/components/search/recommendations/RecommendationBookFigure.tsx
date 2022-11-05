import SimpleBookFigure from "../../general/figure/SimpleBookFigure";
import { Book } from "../../general/helpers/generalTypes";
import useCover from "../../general/helpers/useCover";

interface Props {
    book: Book;
    timeout: number;
}

export default function RecommendationBookFigure({ book, timeout }: Props) {
    const [cover, coverDone] = useCover(book.md5, book.topic, timeout);

    const href = `/search?category=${book.topic}&q=${book.title}`;

    return (
        <div className="recommendation-figure me-2 mb-3">
            <SimpleBookFigure
                loadingClassName="loading-skeleton-recommendation"
                book={book}
                cover={cover}
                coverDone={coverDone}
                href={href}
            />
        </div>
    );
}
