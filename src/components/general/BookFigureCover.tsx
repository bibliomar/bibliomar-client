import { Book } from "./helpers/generalTypes";
import Skeleton from "react-loading-skeleton";
import React from "react";
import Cover, { CacheOptions } from "@readshape/covers";
import { Link } from "react-router-dom";
import { StorageOptions } from "@readshape/covers/dist/types";
import SimpleCoverCanvas from "./figure/SimpleCoverCanvas";
import SimpleFigureSkeleton from "./figure/SimpleFigureSkeleton";

interface Props {
    book: Book;
    cover: string | undefined;
    coverDone: boolean;
    loadingClassName?: string;
    href?: string;
    onClick?: React.MouseEventHandler;
}

// Default cover implementation for any figure that uses MDBRipple or a div with bg-image class.
export default function BookFigureCover({
    book,
    cover,
    coverDone,
    loadingClassName,
    href,
    onClick,
}: Props) {
    return (
        <>
            {coverDone ? (
                cover ? (
                    <img
                        src={cover}
                        alt="Capa do livro"
                        className="h-100 w-100"
                    />
                ) : (
                    <SimpleCoverCanvas book={book} />
                )
            ) : (
                <SimpleFigureSkeleton loadingClassName={loadingClassName} />
            )}

            {href ? (
                <Link to={href} onClick={onClick}>
                    <div
                        className={"mask"}
                        style={{
                            backgroundColor: coverDone
                                ? "rgba(0,0,0,0.1)"
                                : undefined,
                            zIndex: "30000",
                        }}
                    />
                </Link>
            ) : null}
        </>
    );
}
