import { useContext } from "react";
import { ThemeContext } from "../helpers/generalContext";
import { MDBIcon, MDBNavbarItem, MDBNavbarLink } from "mdb-react-ui-kit";
import { ThemeOptions } from "../helpers/generalTypes";

export default function NavbarThemeSelector() {
    const themeContext = useContext(ThemeContext);
    const changeTheme = () => {
        themeContext.setTheme(
            themeContext.theme === ThemeOptions.light
                ? ThemeOptions.dark
                : ThemeOptions.light
        );
    };
    return (
        <MDBNavbarItem className="ms-4">
            <MDBNavbarLink>
                <div onClick={changeTheme}>
                    <MDBIcon
                        fas
                        icon={
                            themeContext.theme === ThemeOptions.light
                                ? "sun"
                                : "moon"
                        }
                        style={{ fontSize: "1.5rem" }}
                    />
                </div>
            </MDBNavbarLink>
        </MDBNavbarItem>
    );
}
