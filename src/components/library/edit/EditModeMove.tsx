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

export default function EditModeMove({
    actionLoading,
    setActionLoading,
}: EditModeSubProps) {
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
            jwtToken
        ) {
            setActionLoading(true);
            await addBookToLibrary(
                selectedBooksContext.selectedBooks,
                jwtToken,
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
                <MDBDropdownHeader>Mover para</MDBDropdownHeader>
                <MDBDropdownItem>
                    <MDBDropdownLink
                        data-category={"reading"}
                        onClick={(evt) => handleClick(evt)}
                    >
                        Lendo agora
                    </MDBDropdownLink>
                </MDBDropdownItem>
                <MDBDropdownItem>
                    <MDBDropdownLink
                        data-category={"toRead"}
                        onClick={handleClick}
                    >
                        Planejando ler
                    </MDBDropdownLink>
                </MDBDropdownItem>
                <MDBDropdownItem>
                    <MDBDropdownLink
                        data-category={"backlog"}
                        onClick={handleClick}
                    >
                        Backlog
                    </MDBDropdownLink>
                </MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown>
    );
}
