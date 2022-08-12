import { MDBTypography } from "mdb-react-ui-kit";
import Break from "../general/Break";

export default function BookInfoError() {
    return (
        <>
            <div className="d-flex flex-wrap justify-content-center text-dark">
                <MDBTypography
                    className="fw-bold mb-3"
                    tag="div"
                    note
                    noteColor="info"
                >
                    <span>
                        Desculpe, você precisa acessar essa página a partir da
                        pesquisa ou de sua biblioteca.
                    </span>
                </MDBTypography>
                <Break />
                <MDBTypography
                    className="fw-bold mb-3"
                    tag="div"
                    note
                    noteColor="info"
                >
                    <span>
                        Quando você clica em um livro, nós salvamos informações
                        importantes que serão mostradas aqui.
                    </span>
                </MDBTypography>
            </div>
        </>
    );
}
