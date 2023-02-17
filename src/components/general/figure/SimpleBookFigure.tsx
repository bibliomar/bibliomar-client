import { Metadata } from "../helpers/generalTypes";
import { MDBCheckbox, MDBRipple } from "mdb-react-ui-kit";
import React, { useContext, useEffect, useState } from "react";
import { EditModeContext } from "../../library/helpers/libraryContext";
import { useNavigate } from "react-router-dom";
import BookFigureCover from "../BookFigureCover";
import { formatBytes } from "../helpers/generalFunctions";
import { useTranslation } from "react-i18next";

interface SimpleBookFigureProps {
    metadata: Metadata;
    cover: string | undefined;
    coverDone: boolean;
    loadingClassName?: string;
    href?: string;
    expanded?: boolean;
}

// A reusable metadata figure which shows the metadata info on top of its cover.
export default function SimpleBookFigure({
    metadata,
    cover,
    loadingClassName,
    coverDone,
    href,
    expanded,
}: SimpleBookFigureProps) {
    const editModeContext = useContext(EditModeContext);
    const [onSelectedBooks, setOnSelectedBooks] = useState<boolean>(false);
    const { t } = useTranslation();

    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        if (!onSelectedBooks) {
            const previouslySelected = editModeContext.selectedBooksRef.current;
            editModeContext.selectedBooksRef.current = [
                ...previouslySelected,
                metadata,
            ];
            setOnSelectedBooks(true);
        } else {
            const previouslySelected = editModeContext.selectedBooksRef.current;
            editModeContext.selectedBooksRef.current =
                previouslySelected.filter((selectedBook) => {
                    return selectedBook.md5 !== metadata.md5;
                });
            setOnSelectedBooks(false);
        }
    };

    useEffect(() => {
        if (
            !editModeContext.editMode ||
            editModeContext.selectedBooksRef.current.length === 0
        ) {
            setOnSelectedBooks(false);
            return;
        }
        const bookOnList = editModeContext.selectedBooksRef.current.find(
            (selectedBook) => {
                return selectedBook.md5 === metadata.md5;
            }
        );

        if (bookOnList && !onSelectedBooks) {
            setOnSelectedBooks(true);
            return;
        }

        if (!bookOnList && onSelectedBooks) {
            setOnSelectedBooks(false);
            return;
        }
    }, [editModeContext.editMode]);

    const formatAndSize = `${
        metadata.extension
            ? metadata.extension.toUpperCase()
            : t("metadatainfo:undefinedField")
    }, ${
        metadata.fileSize
            ? formatBytes(metadata.fileSize)
            : t("metadatainfo:undefinedField")
    }`;

    return (
        <div className="position-relative w-100 h-100">
            <div className="simple-figure-bg text-light">
                <span
                    className="ms-2 text-nowrap simple-text fw-bolder"
                    style={{ fontSize: "1.05em" }}
                >
                    {metadata.title}
                </span>
                <br />
                <span
                    className="ms-2 text-nowrap simple-text"
                    style={{ fontSize: "0.9em" }}
                >
                    {metadata.author}
                </span>
                <br />
                {expanded && (
                    <span
                        className="ms-2 text-nowrap simple-text"
                        style={{ fontSize: "0.9em" }}
                    >
                        {formatAndSize}
                    </span>
                )}
            </div>
            <MDBRipple
                className={`bg-image hover-overlay shadow-1-strong rounded w-100 h-100`}
                rippleTag="div"
                rippleColor="light"
            >
                {editModeContext.editMode && (
                    <div className="library-checkbox-container">
                        <MDBCheckbox
                            checked={onSelectedBooks}
                            className="library-checkbox-input"
                            onChange={handleCheckboxChange}
                        />
                    </div>
                )}

                <BookFigureCover
                    metadata={metadata}
                    cover={cover}
                    coverDone={coverDone}
                    loadingClassName={loadingClassName}
                    href={href}
                    onClick={(evt) => {
                        evt.preventDefault();
                        if (editModeContext && editModeContext.editMode) {
                            handleCheckboxChange();
                        } else if (href) {
                            navigate(href);
                        }
                    }}
                />
            </MDBRipple>
        </div>
    );
}
