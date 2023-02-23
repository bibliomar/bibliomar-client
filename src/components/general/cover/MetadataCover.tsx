// noinspection AllyJsxHardcodedStringInspection

import { Metadata } from "../helpers/generalTypes";
import Skeleton from "react-loading-skeleton";
import React from "react";
import { Link } from "react-router-dom";
import MetadataCoverSkeleton from "./MetadataCoverSkeleton";
import { getEmptyCover, resolveCoverUrl } from "../helpers/generalFunctions";

interface Props {
    coverUrl: string | undefined;
    coverDone: boolean;
    href?: string;
    mask?: boolean;
    maskClassname?: string | undefined;
    maskElement?: JSX.Element;

    onClick?: React.MouseEventHandler;
}

const chooseCurrentCoverComponent = (props: Props) => {
    const noCoverUrl: string = getEmptyCover();
    let usableCover: string;

    if (props.coverDone) {
        if (props.coverUrl == null) {
            usableCover = noCoverUrl;
        } else {
            usableCover = props.coverUrl;
        }

        return <img src={usableCover} alt="Cover" className="h-100 w-100" />;
    } else {
        return <MetadataCoverSkeleton />;
    }
};

const showCoverMaskUrl = (props: Props) => {
    if (props.href) {
        return (
            <Link to={props.href} onClick={props.onClick}>
                {props.mask || props.mask == undefined ? (
                    <div
                        className={`mask ${
                            props.maskClassname ?? "default-figure-mask"
                        }`}
                    >
                        {props.maskElement ?? null}
                    </div>
                ) : null}
            </Link>
        );
    }

    return null;
};

// Default cover implementation for any figure that uses MDBRipple or a div with bg-image class.
export default function MetadataCover(props: Props) {
    return (
        <>
            {chooseCurrentCoverComponent(props)}
            {showCoverMaskUrl(props)}
        </>
    );
}
