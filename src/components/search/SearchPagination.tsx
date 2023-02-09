import Paginator from "../general/Paginator";

interface Props {
    pageChangeHandler: (evt: any) => void;
    pageCount: number;
}

export default function SearchPagination({
    pageCount,
    pageChangeHandler,
}: Props) {
    const renderBasedOnPageCount = () => {
        if (pageCount === 0) {
            return null;
        }
        return (
            <div className="mt-3 p-2 rounded-3 basic-container mb-4">
                <Paginator
                    pageChangeHandler={pageChangeHandler}
                    pageCount={pageCount}
                />
            </div>
        );
    };

    return renderBasedOnPageCount();
}
