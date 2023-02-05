import { useContext } from "react";
import { Theme } from "../helpers/generalContext";
import { MDBIcon, MDBNavbarItem, MDBNavbarLink } from "mdb-react-ui-kit";
import { ThemeOptions } from "../helpers/generalTypes";

export default function ThemeChooser() {
    const themeContext = useContext(Theme);
    const changeTheme = () => {
        themeContext.setTheme((prevState) => {
            if (prevState === ThemeOptions.light) {
                localStorage.setItem("theme", ThemeOptions.dark);
                return ThemeOptions.dark;
            } else {
                localStorage.setItem("theme", ThemeOptions.light);
                return ThemeOptions.light;
            }
        });
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
