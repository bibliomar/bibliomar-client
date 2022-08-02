import { MDBContainer, MDBSpinner } from "mdb-react-ui-kit";
import Break from "./components/general/Break";

export default function Themeing() {
    return (
        <div className="like-body bg-alt">
            <MDBContainer
                fluid
                className="d-flex justify-content-center flex-wrap"
            >
                <MDBSpinner
                    size="lg"
                    color="white"
                    style={{
                        marginTop: "40vh",
                        width: "5rem",
                        height: "5rem",
                    }}
                />
                <Break />
                <span className="text-info mt-4">Carregando tema...</span>
            </MDBContainer>
        </div>
    );
}
