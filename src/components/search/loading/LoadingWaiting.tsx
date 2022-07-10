import { MDBSpinner, MDBTypography } from "mdb-react-ui-kit";
import Break from "../../general/Break";
export default function LoadingWaiting() {
    return (
        <div className="d-flex flex-wrap justify-content-center">
            <MDBTypography note noteColor="primary">
                Estamos carregando seus arquivos, isso pode demorar um pouco...
            </MDBTypography>
            <Break />
            <MDBSpinner role="status" color="light">
                <span className="visually-hidden">Carregando...</span>
            </MDBSpinner>
        </div>
    );
}
