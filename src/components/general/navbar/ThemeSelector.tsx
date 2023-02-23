import { useContext } from "react";
import { ThemeContext } from "../helpers/generalContext";
import { MDBIcon, MDBNavbarItem, MDBNavbarLink } from "mdb-react-ui-kit";
import { ThemeOptions } from "../helpers/generalTypes";

export default function ThemeSelector() {
    const themeContext = useContext(ThemeContext);
    const changeTheme = () => {
        themeContext.setTheme(
            themeContext.theme === ThemeOptions.light
                ? ThemeOptions.dark
                : ThemeOptions.light
        );
    };
    return (
        <MDBNavbarItem className="ms-auto ms-lg-0 mt-3 mt-lg-0 me-2">
            <MDBNavbarLink>
                <div onClick={changeTheme}>
                    <MDBIcon
                        fas
                        icon={
                            themeContext.theme === ThemeOptions.light
                                ? "sun"
                                : "moon"
                        }
                        size={"lg"}
                    />
                </div>
            </MDBNavbarLink>
        </MDBNavbarItem>
    );
}
