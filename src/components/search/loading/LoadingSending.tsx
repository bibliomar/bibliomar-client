import { MDBSpinner, MDBTypography } from "mdb-react-ui-kit";
import Break from "../../general/Break";
export default function LoadingSending() {
    return (
        <div className="d-flex flex-wrap justify-content-center">
            <MDBTypography note noteColor="primary">
                Estamos enviando sua solicitação ao servidor...
            </MDBTypography>
            <Break />
        </div>
    );
}
