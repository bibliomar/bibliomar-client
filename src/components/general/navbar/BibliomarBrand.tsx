import { MDBBadge } from "mdb-react-ui-kit";
import { useContext } from "react";
import { Theme } from "../helpers/generalContext";
import { ThemeOptions } from "../helpers/generalTypes";
import {
    ReaderSettings,
    ReaderThemeAccentOptions,
} from "../../reader/helpers/readerTypes";

interface Props {
    badgeText?: string;
    readerAccent?: ReaderThemeAccentOptions;
}

export default function BibliomarBrand({ badgeText, readerAccent }: Props) {
    const theme = useContext(Theme).theme;
    return (
        <div className="">
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
                alt="Bibliomar"
                className="brand-img"
            />
            {badgeText ? (
                <MDBBadge className="navbar-badge">
                    {badgeText.toUpperCase()}
                </MDBBadge>
            ) : null}
        </div>
    );
}
