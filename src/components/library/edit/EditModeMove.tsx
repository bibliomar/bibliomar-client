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
import { EditModeContext } from "../helpers/libraryContext";
import { LibraryCategories } from "../../general/helpers/generalTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { addBookToLibrary } from "../../general/helpers/generalFunctions";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../general/helpers/generalContext";
import { libraryCategoryToLocaleText } from "../../metadatainfo/helpers/bookinfoFunctions";
import { toast } from "react-toastify";
import { UserLibraryContext } from "../helpers/libraryFunctions";

export default function EditModeMove() {
    const { t } = useTranslation();
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const editModeContext = useContext(EditModeContext);
    const userLibraryContext = useContext(UserLibraryContext);
    console.log(editModeContext.selectedBooksRef.current);

    const handleClick = async (targetCategory: LibraryCategories) => {
        if (
            !editModeContext.editMode ||
            editModeContext.selectedBooksRef.current.length === 0 ||
            !authContext.userLogged
        ) {
            if (editModeContext.selectedBooksRef.current.length === 0) {
                toast.error("Nenhum livro selecionado.");
            }
            return;
        }
        toast.info("Movendo livros...");

        let movedBooksNum = 0;
        for (const book of editModeContext.selectedBooksRef.current) {
            try {
                const req = await addBookToLibrary(
                    authContext,
                    book,
                    targetCategory
                );
                console.log(req);
                if ([200, 201].includes(req.request.status)) {
                    movedBooksNum++;
                }
            } catch (e: any) {
                console.error(e);
                if (e.request) {
                    if (e.request.status === 400) {
                        toast.error(
                            <div>
                                <span>
                                    Erro ao mover <strong>{book.title}</strong>.
                                    Livro ja se encontra na categoria de
                                    destino.
                                </span>
                            </div>
                        );
                    }
                }
            }
        }

        if (movedBooksNum > 0) {
            toast.success(`${movedBooksNum} livros movidos com sucesso.`);
            editModeContext.selectedBooksRef.current = [];
            userLibraryContext.updateUserLibrary();
        }
        // PS: The update request is async.
    };

    const renderDropdownItem = (category: LibraryCategories, key: number) => {
        return (
            <MDBDropdownItem key={key}>
                <MDBDropdownLink
                    onClick={async (evt) => {
                        evt.preventDefault();
                        await handleClick(category);
                    }}
                >
                    {libraryCategoryToLocaleText(t, category)}
                </MDBDropdownLink>
            </MDBDropdownItem>
        );
    };

    return (
        <MDBDropdown>
            <MDBDropdownToggle
                size={"lg"}
                type={"button"}
                color={"none"}
                className={`btn-floating btn-outline-primary`}
            >
                <MDBIcon fas icon="exchange-alt" />
            </MDBDropdownToggle>

            <MDBDropdownMenu>
                <MDBDropdownHeader>{t("library:editMoveTo")}</MDBDropdownHeader>
                {Object.values(LibraryCategories).map((category, index) => {
                    return renderDropdownItem(category, index);
                })}
            </MDBDropdownMenu>
        </MDBDropdown>
    );
}
