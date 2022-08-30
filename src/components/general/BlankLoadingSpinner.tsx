import { MDBSpinner } from "mdb-react-ui-kit";
import { useContext } from "react";
import { Theme } from "./helpers/generalContext";
import { ThemeOptions } from "./helpers/generalTypes";

interface Props {
    color?: any;
    size?: string;
}

export default function ({ color, size }: Props) {
    const theme = useContext(Theme).theme;
    return (
        <div className="d-flex justify-content-center mt-5">
            <MDBSpinner
                color={
                    color
                        ? color
                        : theme === ThemeOptions.light
                        ? ThemeOptions.dark
                        : ThemeOptions.light
                }
                style={{
                    width: size ? size : "4rem",
                    height: size ? size : "4rem",
                }}
            />
        </div>
    );
}
