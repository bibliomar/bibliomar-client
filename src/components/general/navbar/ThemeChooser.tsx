import { useContext } from "react";
import { Theme } from "../helpers/generalContext";
import { MDBIcon, MDBNavbarItem, MDBNavbarLink } from "mdb-react-ui-kit";
import { ThemeOptions } from "../helpers/generalTypes";

export default function ThemeChooser() {
    const themeContext = useContext(Theme);
    const changeTheme = () => {
        themeContext.setTheme((prevState) => {
            if (prevState === ThemeOptions.light) {
                return ThemeOptions.dark;
            } else {
                return ThemeOptions.light;
            }
        });
    };
    return (
        <MDBNavbarItem className="ms-auto mt-3 mt-lg-0">
            <MDBNavbarLink>
                <div onClick={changeTheme}>
                    <MDBIcon fas icon="adjust" size={"lg"} />
                </div>
            </MDBNavbarLink>
        </MDBNavbarItem>
    );
}
