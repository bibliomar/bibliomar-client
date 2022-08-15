import ReaderSavedBooksList from "./ReaderSavedBooksList";
import ReaderEmptyList from "./ReaderEmptyList";
import { SavedBooks } from "../helpers/readerTypes";

interface Props {
    savedBooks?: SavedBooks;
}

export default function ReaderSavedBooksScreen({ savedBooks }: Props) {
    const renderBasedOnSaved = () => {
        if (savedBooks != null) {
            // If at least one element is populated on savedBooks.
            if (Object.values(savedBooks).some((el) => el != null)) {
                return <ReaderSavedBooksList savedBooks={savedBooks} />;
            } else {
                return <ReaderEmptyList />;
            }
        } else {
            return <ReaderEmptyList />;
        }
    };
    return (
        <div className="d-flex flex-wrap justify-content-center">
            {renderBasedOnSaved()}
        </div>
    );
}
