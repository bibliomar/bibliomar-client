import {
    MDBBtn,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBIcon,
    MDBSpinner,
} from "mdb-react-ui-kit";
import React, { MouseEventHandler, useContext, useState } from "react";
import { EditModeContext } from "../helpers/libraryContext";
import { LibraryCategories } from "../../general/helpers/generalTypes";
import { useLocation, useNavigate } from "react-router-dom";
import {
    addBookToLibrary,
    libraryCategoryToLocaleText,
} from "../../general/helpers/generalFunctions";
import { Trans, useTranslation } from "react-i18next";
import { AuthContext } from "../../general/helpers/generalContext";
import { toast } from "react-toastify";
import { UserLibraryContext } from "../helpers/libraryFunctions";

export default function EditModeMove() {
    const { t } = useTranslation();
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const editModeContext = useContext(EditModeContext);
    const userLibraryContext = useContext(UserLibraryContext);

    const handleClick = async (targetCategory: LibraryCategories) => {
        if (
            !editModeContext.editMode ||
            editModeContext.selectedBooksRef.current.length === 0 ||
            !authContext.userLogged
        ) {
            if (editModeContext.selectedBooksRef.current.length === 0) {
                const message = t("library:nenhumLivroSelecionado");
                toast.error(message);
            }
            return;
        }
        const movingMessage = t("library:movendoLivros");
        const infoToast = toast.info(movingMessage);

        let movedBooksNum = 0;
        for (const book of editModeContext.selectedBooksRef.current) {
            try {
                toast.update(infoToast, {
                    render: t("library:movendo", { title: book.title }),
                });
                const req = await addBookToLibrary(
                    authContext,
                    book,
                    targetCategory
                );
                if ([200, 201].includes(req.request.status)) {
                    movedBooksNum++;
                }
            } catch (e: any) {
                console.error(e);
                if (e.request) {
                    if (e.request.status === 400) {
                        // Ignored, means the book was already in the target category.
                    } else {
                        toast.error(
                            <div>
                                <span>
                                    {t("library:erroAoMoverTenteNovamente", {
                                        title: book.title,
                                    })}
                                </span>
                            </div>
                        );
                    }
                }
            }
        }
        toast.dismiss(infoToast);
        if (movedBooksNum > 0) {
            const toastSucess = t("library:livrosMovidosComSucesso", {
                movedBooksNum: movedBooksNum,
            });
            toast.success(toastSucess);
            editModeContext.selectedBooksRef.current = [];
            // PS: The update request is async.
            await userLibraryContext.updateUserLibrary();
        }
    };

    const renderDropdownItem = (
        category: LibraryCategories,
        key: number
    ): JSX.Element => {
        return (
            <MDBDropdownItem
                link
                onClick={async (evt) => {
                    evt.preventDefault();
                    await handleClick(category);
                }}
                key={key}
            >
                {libraryCategoryToLocaleText(t, category)}
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
                <MDBDropdownItem header>
                    {t("library:editMoveTo")}
                </MDBDropdownItem>
                <>
                    {Object.keys(LibraryCategories).map((category, index) => {
                        return renderDropdownItem(
                            category as LibraryCategories,
                            index
                        );
                    })}
                </>
            </MDBDropdownMenu>
        </MDBDropdown>
    );
}
