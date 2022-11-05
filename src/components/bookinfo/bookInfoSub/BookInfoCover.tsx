import Break from "../../general/Break";
import useCover from "../../general/helpers/useCover";
import Skeleton from "react-loading-skeleton";
import BookFigureCover from "../../general/BookFigureCover";
import { Book } from "../../general/helpers/generalTypes";

interface Props {
    book: Book;
    md5: string;
}

// Here we use MDBootstrap col- classes to make the cover stay in the left half of the screen.
export default function BookInfoCover({ md5, book }: Props) {
    const [cover, coverDone] = useCover(md5, book.topic);

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
