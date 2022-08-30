import { useFormik } from "formik";
import { defaultFilters } from "./helpers/libraryFunctions";
import { useContext } from "react";
import { Filters } from "./helpers/libraryContext";

export default function LibraryFilters() {
    const filtersContext = useContext(Filters);
    const filters = filtersContext.filters;
    const formik = useFormik({
        initialValues: { isReading: false },
        onSubmit: (values) => {},
    });
    return (
        <div className="basic-container">
            <div className="d-flex flex-wrap justify-content-center"></div>
        </div>
    );
}
