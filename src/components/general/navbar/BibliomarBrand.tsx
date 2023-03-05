// noinspection AllyJsxHardcodedStringInspection

import { MDBBadge } from "mdb-react-ui-kit";
import React, { useContext } from "react";
import { ThemeContext } from "../helpers/generalContext";
import { ThemeOptions } from "../helpers/generalTypes";
import {
    ReaderSettings,
    ReaderThemeAccentOptions,
} from "../../reader/helpers/readerTypes";

interface Props {
    badgeContent?: string | JSX.Element;
    readerAccent?: ReaderThemeAccentOptions;
}

export default function BibliomarBrand({ badgeContent, readerAccent }: Props) {
    const theme = useContext(ThemeContext).theme;
    return (
        <div className="w-100">
            <img
                src={
                    readerAccent
                        ? readerAccent === ReaderThemeAccentOptions.light
                            ? "/assets/img/BIBLIOMAR-light-theme.svg"
                            : "/assets/img/BIBLIOMAR-dark-theme.svg"
                        : theme === ThemeOptions.light
                        ? "/assets/img/BIBLIOMAR-light-theme.svg"
                        : "/assets/img/BIBLIOMAR-dark-theme.svg"
                }
                className="w-75"
                alt="Bibliomar"
            />
            {badgeContent ? (
                <MDBBadge className="navbar-badge">{badgeContent}</MDBBadge>
            ) : null}
        </div>
    );
}
