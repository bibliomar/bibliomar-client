import { useOutletContext } from "react-router-dom";
import LibrarySection from "../LibrarySection";

interface Props {
    message: string;
    bookCategory: string;
}

export default function (props: Props) {
    const context: any = useOutletContext();
    const userInfo = context["userInfo"];
    const setProgress = context["setProgress"];
    return (
        <div className="d-flex flex-wrap justify-content-start mt-5 w-100">
            <LibrarySection
                expanded
                message={props.message}
                bookCategory={props.bookCategory}
                booksInfo={userInfo[props.bookCategory]}
                setProgress={setProgress}
            />
        </div>
    );
}
