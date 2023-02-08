import Break from "../../general/Break";
import useCover from "../../general/helpers/useCover";
import Skeleton from "react-loading-skeleton";
import BookFigureCover from "../../general/BookFigureCover";
import { Book } from "../../general/helpers/generalTypes";

interface Props {
    book: Book;
}

export default function BookInfoCover({ book }: Props) {
    const [cover, coverDone] = useCover(book.md5, book.topic);

    return (
        <div className="d-flex flex-column mb-3 w-100">
            <div className="bg-image">
                <BookFigureCover
                    book={book}
                    cover={cover}
                    coverDone={coverDone}
                />
            </div>
        </div>
    );
}
