import SimpleBookFigure from "../../general/figure/SimpleBookFigure";
import { useEffect, useState } from "react";
import { getCover } from "../../general/helpers/generalFunctions";
import { Book } from "../../general/helpers/generalTypes";

interface Props {
    book: Book;
    timeout: number;
}

export default function RecommendationBookFigure({ book, timeout }: Props) {
    const [cover, setCover] = useState<string>(
        "https://libgen.rocks/img/blank.png"
    );

    const [coverDone, setCoverDone] = useState<boolean>(false);

    useEffect(() => {
        let coverSetTimeout: number | undefined;

        getCover(book.md5, setCover, setCoverDone, timeout).then((r) => {
            coverSetTimeout = r;
        });

        return () => {
            clearTimeout(coverSetTimeout);
        };
    }, []);

    const href = `/search?category=${book.topic}&q=${book.title}`;

    return (
        <div className="recommendation-figure me-2 mb-3">
            <SimpleBookFigure
                book={book}
                cover={cover}
                coverDone={coverDone}
                href={href}
            />
        </div>
    );
}
