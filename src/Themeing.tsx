import { MDBContainer, MDBSpinner } from "mdb-react-ui-kit";
import Break from "./components/general/Break";

export default function Themeing() {
    return (
        <div className="like-body bg-alt">
            <p
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "2rem",
                    textAlign: "center",
                }}
            >
                Carregando tema...
            </p>
        </div>
    );
}
