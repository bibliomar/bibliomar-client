import { Book } from "./helpers/generalTypes";
import Skeleton from "react-loading-skeleton";
import React from "react";
import Cover, { CacheOptions } from "@readshape/covers";
import { Link } from "react-router-dom";
import { StorageOptions } from "@readshape/covers/dist/types";
import SimpleFigureSkeleton from "./figure/SimpleFigureSkeleton";

interface Props {
    book: Book;
    cover: string | undefined;
    coverDone: boolean;
    loadingClassName?: string;
    href?: string;
    onClick?: React.MouseEventHandler;
}

const chooseCurrentCoverComponent = (props: Props) => {
    const noCoverUrl: string = "https://libgen.rocks/img/blank.png";

    if (props.coverDone) {
        if (props.cover == null) {
            props.cover = noCoverUrl;
        }

        return (
            <img
                src={props.cover}
                alt="Capa do livro"
                className="h-100 w-100"
            />
        );
    } else {
        return (
            <SimpleFigureSkeleton loadingClassName={props.loadingClassName} />
        );
    }
};

const showCoverMaskUrl = (props: Props) => {
    if (props.href) {
        return (
            <Link to={props.href} onClick={props.onClick}>
                <div
                    className={"mask"}
                    style={{
                        backgroundColor: props.coverDone
                            ? "rgba(0,0,0,0.1)"
                            : undefined,
                        zIndex: "999",
                    }}
                />
            </Link>
        );
    }

    return null;
};

// Default cover implementation for any figure that uses MDBRipple or a div with bg-image class.
export default function BookFigureCover(props: Props) {
    return (
        <>
            {chooseCurrentCoverComponent(props)}
            {showCoverMaskUrl(props)}
        </>
    );
}
