import { MDBBadge } from "mdb-react-ui-kit";
import { useContext } from "react";
import { Theme } from "../helpers/generalContext";
import { ThemeOptions } from "../helpers/generalTypes";

export default function BibliomarBrand({ badgeText }: { badgeText?: string }) {
    const theme = useContext(Theme).theme;
    return (
        <div>
            <img
                src={
                    theme === ThemeOptions.light
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
