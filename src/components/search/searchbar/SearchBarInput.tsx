import { MDBInput } from "mdb-react-ui-kit";
import { Hint } from "react-bootstrap-typeahead";
import React, { SetStateAction } from "react";
import { TypeaheadInputProps } from "react-bootstrap-typeahead/types/types";
import { useTranslation } from "react-i18next";

interface SearchBarInputProps {
    inputProps: TypeaheadInputProps;
    queryRef: React.MutableRefObject<string>;
    setOptionsHidden: React.Dispatch<SetStateAction<boolean>>;
}

export default function SearchBarInput({
    inputProps,
    queryRef,
    setOptionsHidden,
}: SearchBarInputProps) {
    const { t } = useTranslation();
    return (
        <Hint className="">
            <MDBInput
                {...inputProps}
                id="searchbar-input"
                // Very important!
                name="q"
                label={"Search"}
                className="search-input"
                placeholder={t("search:placeholder") as string}
                onInput={(e) => {
                    queryRef.current = e.currentTarget.value;
                }}
                wrapperClass="w-100 d-flex"
                /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                // @ts-ignore
                inputRef={(ref) => {
                    inputProps.inputRef(ref);
                    inputProps.referenceElementRef(ref);
                }}
                value={queryRef.current}
            >
                <div className="d-flex flex-column justify-content-center me-4">
                    <i
                        className="fas fa-bars fa-lg"
                        onClick={() => {
                            setOptionsHidden((prev) => {
                                localStorage.setItem(
                                    "options-hidden",
                                    !prev ? "true" : "false"
                                );
                                return !prev;
                            });
                        }}
                    />
                </div>
            </MDBInput>
        </Hint>
    );
}
