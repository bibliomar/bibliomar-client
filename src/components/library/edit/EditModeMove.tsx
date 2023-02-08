import {
    MDBBtn,
    MDBDropdown,
    MDBDropdownHeader,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBIcon,
    MDBSpinner,
} from "mdb-react-ui-kit";
import React, { MouseEventHandler, useContext, useState } from "react";
import { SelectedBooksContext } from "../helpers/libraryTypes";
import { EditMode, SelectedBooks } from "../helpers/libraryContext";
import { LibraryCategories } from "../../general/helpers/generalTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { EditModeSubProps } from "../LibraryNavbar";
import { addBookToLibrary } from "../../general/helpers/generalFunctions";
import { useTranslation } from "react-i18next";
import { Auth } from "../../general/helpers/generalContext";

export default function EditModeMove({
    actionLoading,
    setActionLoading,
}: EditModeSubProps) {
    const { t } = useTranslation();
    const authContext = useContext(Auth);
    const navigate = useNavigate();
    const editModeContext = useContext(EditMode);
    const selectedBooksContext = useContext(SelectedBooks);
    const jwtToken = localStorage.getItem("jwt-token");
    const handleClick = async (evt: React.MouseEvent<HTMLAnchorElement>) => {
        const category = evt.currentTarget.dataset.category;
        if (
            editModeContext &&
            editModeContext.editMode &&
            selectedBooksContext &&
            selectedBooksContext.selectedBooks.length > 0 &&
            authContext.userLogged
        ) {
            setActionLoading(true);
            await addBookToLibrary(
                selectedBooksContext.selectedBooks,
                jwtToken!,
                LibraryCategories[category as keyof typeof LibraryCategories]
            );
            setActionLoading(false);
            navigate(0);
        }
    };

    return (
        <MDBDropdown>
            <MDBDropdownToggle
                disabled={
                    actionLoading ||
                    selectedBooksContext.selectedBooks.length === 0
                }
                size={"lg"}
                type={"button"}
                color={"none"}
                className={`btn-floating btn-outline-primary`}
            >
                {actionLoading ? (
                    <MDBIcon fas icon="spinner" />
                ) : (
                    <MDBIcon fas icon="exchange-alt" />
                )}
            </MDBDropdownToggle>

            <MDBDropdownMenu>
                <MDBDropdownHeader>{t("library:editMoveTo")}</MDBDropdownHeader>
                <MDBDropdownItem>
                    <MDBDropdownLink
                        data-category={"reading"}
                        onClick={(evt) => handleClick(evt)}
                    >
                        {t("library:editReadingNow")}
                    </MDBDropdownLink>
                </MDBDropdownItem>
                <MDBDropdownItem>
                    <MDBDropdownLink
                        data-category={"toRead"}
                        onClick={handleClick}
                    >
                        {t("library:editPlanToRead")}
                    </MDBDropdownLink>
                </MDBDropdownItem>
                <MDBDropdownItem>
                    <MDBDropdownLink
                        data-category={"backlog"}
                        onClick={handleClick}
                    >
                        {t("library:editBacklog")}
                    </MDBDropdownLink>
                </MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown>
    );
}
