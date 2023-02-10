// noinspection AllyJsxHardcodedStringInspection

import React, { SetStateAction, useEffect } from "react";

import { MDBRipple } from "mdb-react-ui-kit";
import Break from "../../general/Break";
import { Book } from "../../general/helpers/generalTypes";
import useCover from "../../general/helpers/useCover";
import BookFigureCover from "../../general/BookFigureCover";
import {
    SearchRequestStatus,
    SearchRequestStatusOptions,
    SearchRequestType,
} from "../helpers/searchTypes";
import { useTranslation } from "react-i18next";

interface Props {
    book: Book;
    timeout: number;
}

export default function BookFigure({ book, timeout }: Props) {
    const { t } = useTranslation();
    const [cover, coverDone] = useCover(book, timeout);

    const href = `/book/${book.topic}/${book.md5}`;

    return (
        <figure className="figure d-flex flex-column result-div me-lg me-md-3">
            <MDBRipple
                className={`bg-image hover-overlay shadow-1-strong w-100 result-image figure-img mb-1`}
                rippleTag="div"
                rippleColor="light"
            >
                <BookFigureCover
                    book={book}
                    cover={cover}
                    loadingClassName="loading-skeleton-search"
                    coverDone={coverDone}
                    href={href}
                />
            </MDBRipple>

            <figcaption
                className={`figure-caption text-wrap border rounded-7 rounded-top border-dark
            border-top-0 basic-container-alt pt-1 w-100 flex-grow-1 d-flex flex-column text-color`}
                style={{ fontSize: "1rem" }}
            >
                <div className="d-flex flex-wrap">
                    <span className="mx-2 mb-1">
                        <strong>{t("figure:title")} </strong>
                        {book.title}
                    </span>
                    <Break />
                    <span className="mx-2 mb-1">
                        <strong>{t("figure:author")}</strong>
                        {book["author"]}
                    </span>
                    <Break />
                    <p className="mx-2 mb-2">
                        <strong>{t("figure:file")}</strong>
                        {book.extension
                            ? book.extension.toUpperCase()
                            : null}, {book.formattedSize}
                    </p>
                    <Break />
                </div>
            </figcaption>
        </figure>
    );
}
