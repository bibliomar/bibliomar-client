// noinspection AllyJsxHardcodedStringInspection

import { Metadata } from "./helpers/generalTypes";
import Skeleton from "react-loading-skeleton";
import React from "react";
import { Link } from "react-router-dom";
import SimpleFigureSkeleton from "./figure/SimpleFigureSkeleton";
import { getEmptyCover, resolveCoverUrl } from "./helpers/generalFunctions";

interface Props {
    metadata: Metadata;
    cover: string | undefined;
    coverDone: boolean;
    loadingClassName?: string | undefined;
    href?: string;
    mask?: boolean;
    onClick?: React.MouseEventHandler;
}

const chooseCurrentCoverComponent = (props: Props) => {
    const noCoverUrl: string = getEmptyCover();
    let usableCover: string;

    if (props.coverDone) {
        if (props.cover == null) {
            usableCover = noCoverUrl;
        } else {
            usableCover = props.cover;
        }

        return <img src={usableCover} alt="Cover" className="h-100 w-100" />;
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
                {props.mask || props.mask == undefined ? (
                    <div
                        className={"mask"}
                        style={{
                            backgroundColor: props.coverDone
                                ? "rgba(0,0,0,0.1)"
                                : undefined,

                            // Show above everything in this component,
                            // but below anything with a zIndex bigger than 1.
                            zIndex: "1",
                        }}
                    />
                ) : null}
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
