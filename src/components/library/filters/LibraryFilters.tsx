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
import { useTranslation } from "react-i18next";

export default function LibraryFilters() {
    const filtersContext = useContext(Filters);
    const filters = filtersContext.filters;
    const setFilters = filtersContext.setFilters;
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            format: filters.format,
            title: filters.title,
            author: filters.author,
        },
        onSubmit: (values) => {
            setFilters({ ...values });
        },
    });

    const resetFilters = () => {
        setFilters(defaultFilters);
    };

    // noinspection AllyJsxHardcodedStringInspection
    return (
        <form onSubmit={formik.handleSubmit} style={{}}>
            <div className="basic-container">
                <div className="d-flex flex-wrap justify-content-center">
                    <LibraryFiltersWrapper>
                        <LibraryFiltersIconWrapper>
                            <MDBIcon
                                fas
                                icon="file-alt"
                                size={"lg"}
                                className="me-2"
                            />
                            <LibraryFiltersLabel
                                labelText={t("library:format")}
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
                            <option value={"any"}>{t("library:todos")}</option>
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
                                icon="metadataList"
                                size={"lg"}
                                className="me-2"
                            />
                            <LibraryFiltersLabel
                                labelText={t("library:title")}
                                labelFor={"title"}
                            />
                        </LibraryFiltersIconWrapper>

                        <MDBInput
                            name={"title"}
                            id={"title"}
                            type={"text"}
                            placeholder={
                                t(
                                    "library:thenameofthewindPlaceholder"
                                ) as string
                            }
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
                                labelText={t("library:author")}
                                labelFor={"author"}
                            />
                        </LibraryFiltersIconWrapper>

                        <MDBInput
                            name={"author"}
                            id={"author"}
                            type={"text"}
                            placeholder={"Patrick Rothfuss"}
                            value={formik.values.author}
                            onChange={formik.handleChange}
                        />
                    </LibraryFiltersWrapper>
                    <LibraryFiltersSeparator />
                    <LibraryFiltersWrapper>
                        <MDBBtn type={"submit"} size={"lg"} className="mt-2">
                            {t("library:aplicar")}
                        </MDBBtn>
                        <Break className="mb-2" />
                        <MDBBtn
                            type={"button"}
                            onClick={resetFilters}
                            color={"danger"}
                            size={"sm"}
                        >
                            {t("library:reiniciar")}
                        </MDBBtn>
                    </LibraryFiltersWrapper>
                </div>
            </div>
        </form>
    );
}
