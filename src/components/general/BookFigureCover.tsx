import { Book } from "./helpers/generalTypes";
import Skeleton from "react-loading-skeleton";
import React from "react";
import Cover, { CacheOptions } from "@readshape/covers";
import { Link } from "react-router-dom";
import { StorageOptions } from "@readshape/covers/dist/types";

interface Props {
    book: Book;
    cover: string | undefined;
    coverDone: boolean;
    href?: string;
    onClick?: React.MouseEventHandler;
}

// Default cover implementation for any figure that uses MDBRipple or a div with bg-image class.
export default function BookFigureCover({
    book,
    cover,
    coverDone,
    href,
    onClick,
}: Props) {
    const cacheOptions: CacheOptions = {
        identifier: book.md5,
        storage: StorageOptions.sessionstorage,
    };
    return (
        <Link to={href ? href : "#"} onClick={onClick}>
            {coverDone ? (
                cover ? (
                    <img
                        src={cover}
                        alt="Capa do livro"
                        className="h-100 w-100"
                    />
                ) : (
                    <Cover
                        title={book.title}
                        authors={[book.authors]}
                        className="w-100 h-100"
                        fallbackElement={
                            <Skeleton className="loading-cover-img" />
                        }
                        cacheOptions={cacheOptions}
                    ></Cover>
                )
            ) : (
                <Skeleton className="loading-cover-img" />
            )}

            {href ? (
                <Link to={href} onClick={onClick}>
                    <div
                        className={"mask"}
                        style={{
                            backgroundColor: coverDone
                                ? "rgba(0,0,0,0.2)"
                                : undefined,
                            zIndex: "30000",
                        }}
                    />
                </Link>
            ) : null}
        </Link>
    );
}
