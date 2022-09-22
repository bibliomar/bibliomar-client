import { useFormik } from "formik";
import { defaultFilters } from "../helpers/libraryFunctions";
import { useContext } from "react";
import { Filters } from "../helpers/libraryContext";
import {
    MDBBtn,
    MDBCheckbox,
    MDBIcon,
    MDBInput,
    MDBSwitch,
} from "mdb-react-ui-kit";
import MediumLine from "../../general/MediumLine";
import Break from "../../general/Break";
import SmallLine from "../../general/SmallLine";
import LibraryFiltersLabel from "./LibraryFiltersLabel";
import LibraryFiltersWrapper from "./LibraryFiltersWrapper";
import LibraryFiltersIconWrapper from "./LibraryFiltersIconWrapper";
import LibraryFiltersSeparator from "./LibraryFiltersSeparator";

export default function LibraryFilters() {
    const filtersContext = useContext(Filters);
    const filters = filtersContext.filters;
    const setFilters = filtersContext.setFilters;

    const formik = useFormik({
        initialValues: {
            isReading: filters.isReading,
            format: filters.format,
            title: filters.title,
            authors: filters.authors,
        },
        onSubmit: (values) => {
            setFilters({ ...values });
        },
    });

    const resetFilters = () => {
        setFilters(defaultFilters);
    };

    return (
        <form onSubmit={formik.handleSubmit} style={{}}>
            <div className="basic-container">
                <div className="d-flex flex-wrap justify-content-center">
                    <LibraryFiltersWrapper>
                        <LibraryFiltersIconWrapper>
                            <MDBIcon
                                fas
                                icon="bookmark"
                                size={"lg"}
                                className="me-2"
                            />

                            <LibraryFiltersLabel
                                labelText={"Leitura iniciada"}
                                labelFor={"isReading"}
                            />
                        </LibraryFiltersIconWrapper>

                        <Break />
                        <MDBSwitch
                            name={"isReading"}
                            id={"isReading"}
                            onChange={formik.handleChange}
                            checked={formik.values.isReading}
                        />
                    </LibraryFiltersWrapper>
                    <LibraryFiltersSeparator />
                    <LibraryFiltersWrapper>
                        <LibraryFiltersIconWrapper>
                            <MDBIcon
                                fas
                                icon="file-alt"
                                size={"lg"}
                                className="me-2"
                            />
                            <LibraryFiltersLabel
                                labelText={"Formato"}
                                labelFor={"format"}
                            />
                        </LibraryFiltersIconWrapper>

                        <select
                            className="form-control form-select"
                            name={"format"}
                            id={"format"}
                            onChange={formik.handleChange}
                            value={formik.values.format}
                        >
                            <option value={"any"}>TODOS</option>
                            <option value={"epub"}>EPUB</option>
                            <option value={"pdf"}>PDF</option>
                            <option value={"mobi"}>MOBI</option>
                        </select>
                    </LibraryFiltersWrapper>
                    <LibraryFiltersSeparator />
                    <LibraryFiltersWrapper>
                        <LibraryFiltersIconWrapper>
                            <MDBIcon
                                fas
                                icon="book"
                                size={"lg"}
                                className="me-2"
                            />
                            <LibraryFiltersLabel
                                labelText={"Título"}
                                labelFor={"title"}
                            />
                        </LibraryFiltersIconWrapper>

                        <MDBInput
                            name={"title"}
                            id={"title"}
                            type={"text"}
                            placeholder={"O nome do vento"}
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                    </LibraryFiltersWrapper>
                    <LibraryFiltersSeparator />
                    <LibraryFiltersWrapper>
                        <LibraryFiltersIconWrapper>
                            <MDBIcon
                                fas
                                icon="user"
                                size={"lg"}
                                className="me-2"
                            />

                            <LibraryFiltersLabel
                                labelText={"Autor"}
                                labelFor={"title"}
                            />
                        </LibraryFiltersIconWrapper>

                        <MDBInput
                            name={"authors"}
                            id={"authors"}
                            type={"text"}
                            placeholder={"Patrick Rothfuss"}
                            value={formik.values.authors}
                            onChange={formik.handleChange}
                        />
                    </LibraryFiltersWrapper>
                    <LibraryFiltersSeparator />
                    <LibraryFiltersWrapper>
                        <MDBBtn type={"submit"} size={"lg"} className="mt-2">
                            Aplicar
                        </MDBBtn>
                        <Break className="mb-2" />
                        <MDBBtn
                            type={"button"}
                            onClick={resetFilters}
                            color={"danger"}
                            size={"sm"}
                        >
                            Reiniciar
                        </MDBBtn>
                    </LibraryFiltersWrapper>
                </div>
            </div>
        </form>
    );
}
