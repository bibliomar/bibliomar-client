import { MDBInput } from "mdb-react-ui-kit";
import { Hint } from "react-bootstrap-typeahead";
import React, { SetStateAction, useContext } from "react";
import { TypeaheadInputProps } from "react-bootstrap-typeahead/types/types";
import { useTranslation } from "react-i18next";
import { FormikProps } from "formik";
import { SearchFormFields } from "../helpers/searchTypes";
import { ThemeContext } from "../../general/helpers/generalContext";
import { ThemeOptions } from "../../general/helpers/generalTypes";

interface SearchBarInputProps {
    inputProps: TypeaheadInputProps;
    formik: FormikProps<SearchFormFields>;
    setOptionsHidden: React.Dispatch<SetStateAction<boolean>>;
}

export default function SearchBarInput({
    inputProps,
    setOptionsHidden,
    formik,
}: SearchBarInputProps) {
    const { t } = useTranslation();
    const theme = useContext(ThemeContext);
    const c = async (v: string) => {
        formik.setFieldValue("q", v, false);
    };

    return (
        <Hint className="">
            <div
                className="w-100"
                ref={(ref) => {
                    inputProps.referenceElementRef(ref);
                }}
            >
                <MDBInput
                    contrast={theme.theme === ThemeOptions.dark}
                    {...inputProps}
                    id="q"
                    name="q"
                    label={t("search:pesquisar")}
                    className="flex-grow-1 search-input"
                    placeholder={t("search:placeholder") as string}
                    wrapperClass="w-100 d-flex flex-grow-1"
                    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                    // @ts-ignore

                    inputRef={(ref) => {
                        inputProps.inputRef(ref);
                    }}
                    onInput={async (e) => {
                        // Setting the formik value directly (synchroneously) is not recommended.
                        // However, this is the only way to make the input work properly.
                        // See the note on <AsyncTypeahead /> component on <SearchBar />.
                        // This also implies that functions like 'formik.isValid' will not work properly.
                        formik.values.q = e.currentTarget.value;
                    }}
                    value={formik.values.q}
                >
                    <div className="d-flex flex-column justify-content-center me-4">
                        <i
                            className="fas fa-bars fa-lg"
                            onClick={() => {
                                setOptionsHidden((prev) => {
                                    return !prev;
                                });
                            }}
                        />
                    </div>
                </MDBInput>
            </div>
        </Hint>
    );
}
