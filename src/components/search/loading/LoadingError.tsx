import { MDBBtn, MDBSpinner, MDBTypography } from "mdb-react-ui-kit";
import Break from "../../general/Break";
import { Link } from "react-router-dom";
import {
    SearchRequestStatus,
    SearchRequestStatusOptions,
    SearchRequestType,
} from "../helpers/searchTypes";

// TODO: refactoring and enum of possible errorTypes.

export default function LoadingError({ type, status }: SearchRequestStatus) {
    /*
    function basedOnError() {
        if (props.errorType === "yellow") {
            return (
                <div className="d-flex flex-wrap justify-content-center">
                    <MDBTypography note noteColor="warning">
                        Não conseguimos encontrar nada com esses termos, que tal
                        olhar nossas{" "}
                        <Link to={"/faq?ref=7"}>dicas de pesquisa</Link>?
                    </MDBTypography>
                    <Break />
                </div>
            );
        } else if (props.errorType === "yellow-queryPage") {
            return (
                <div className="">
                    <MDBTypography
                        tag="div"
                        note
                        noteColor="warning"
                        className="d-flex flex-wrap justify-content-center w-25"
                    >
                        <span className="fw-bold">
                            Opa! Essa página está vazia.
                        </span>
                        <Break />
                        <span>Vamos te redirecionar a pagina anterior...</span>
                    </MDBTypography>

                    <Break />
                </div>
            );
        } else if (props.errorType === "red") {
            return (
                <div className="d-flex flex-wrap justify-content-center">
                    <MDBTypography note noteColor="danger">
                        Ops, não conseguimos realizar sua solicitação, por
                        favor, verifique sua conexão.
                    </MDBTypography>
                </div>
            );
        } else if (props.errorType === "blue") {
            return (
                <div className="d-flex flex-wrap justify-content-center">
                    <MDBTypography note noteColor="info">
                        Não é possível realizar pesquisas com menos de 3
                        caracteres.
                    </MDBTypography>
                </div>
            );
        } else if (props.errorType === "red-rate") {
            return (
                <div className="d-flex flex-wrap justify-content-center">
                    <MDBTypography note noteColor="danger">
                        Calma! Você está fazendo muitas requisições.
                    </MDBTypography>
                </div>
            );
        }
    }

     */
    return <div>{}</div>;
}
