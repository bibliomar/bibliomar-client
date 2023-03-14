import { Metadata } from "../helpers/generalTypes";
import { MDBCheckbox, MDBRipple } from "mdb-react-ui-kit";
import React, { useContext, useEffect, useState } from "react";
import { EditModeContext } from "../../library/helpers/libraryContext";
import { useNavigate } from "react-router-dom";
import MetadataCover from "../cover/MetadataCover";
import { formatBytes } from "../helpers/generalFunctions";
import { useTranslation } from "react-i18next";
import { LongPressDetectEvents, useLongPress } from "use-long-press";
import useCover from "../helpers/useCover";
import "./figure.scss";

interface MetadataSelectableFigureProps {
    metadata: Metadata;
    timeout?: number;
    selectable?: boolean;
    href?: string;
    minimal?: boolean;
}

/** A reusable metadata figure which shows the metadata info on top of its cover.
 * If a editModeContext is available, it will enable long press and selections to select the book.
 * @param metadata
 * @param cover
 * @param href
 * @param selectable
 * @constructor
 */
export default function MetadataSelectableFigure({
    metadata,
    timeout,
    href,
    selectable,
    minimal,
}: MetadataSelectableFigureProps) {
    const [cover, coverDone] = useCover(metadata, timeout);
    const editModeContext = useContext(EditModeContext);
    const [onSelectedBooks, setOnSelectedBooks] = useState<boolean>(false);
    // Long press hooks that enables edit mode when long pressed.
    // A editModeContext must be available for this to be activated.
    const bindLongpress = useLongPress(
        () => {
            if (selectable && editModeContext && !editModeContext.editMode) {
                editModeContext.setEditMode(true);
            }
        },
        {
            threshold: 1000,
            detect: LongPressDetectEvents.TOUCH,
            filterEvents: (event) => {
                if (selectable) {
                    return true;
                } else {
                    return false;
                }
            },
            cancelOnMovement: true,
        }
    );
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
    /** Disabled because EditMode now automatically cleans up the selected books on exit.
     * This useEffect detects if a book is already in the selectedBooks list when the editMode is enabled.
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
     */

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
                    style={{ fontSize: "1.1em" }}
                >
                    {metadata.title}
                </span>
                <br />

                {metadata.author ? (
                    <>
                        <span
                            className="ms-2 text-nowrap simple-text"
                            style={{ fontSize: "1em" }}
                        >
                            {metadata.author}
                        </span>
                        <br />
                    </>
                ) : null}

                {!minimal ? (
                    <span
                        className="ms-2 text-nowrap simple-text"
                        style={{ fontSize: "0.9em" }}
                    >
                        {formatAndSize}
                    </span>
                ) : null}
            </div>
            <MDBRipple
                {...bindLongpress()}
                className="bg-image hover-overlay rounded w-100 h-100 shadow-3-strong"
                rippleTag="div"
                rippleColor="light"
            >
                {selectable && editModeContext.editMode && (
                    <div className="library-checkbox-container">
                        <MDBCheckbox
                            checked={onSelectedBooks}
                            className="library-checkbox-input"
                            onChange={handleCheckboxChange}
                        />
                    </div>
                )}

                <MetadataCover
                    coverUrl={cover}
                    coverDone={coverDone}
                    href={href}
                    onClick={(evt) => {
                        evt.preventDefault();
                        if (
                            selectable &&
                            editModeContext &&
                            editModeContext.editMode
                        ) {
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
