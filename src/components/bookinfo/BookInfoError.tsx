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
                        Caso essa mensagem apareça enquanto você acessa um
                        livro, signifca que não conseguimos recuperar as
                        informações do mesmo em nosso servidor. Pedimos que
                        tente novamente mais tarde.
                    </span>
                </MDBTypography>
            </div>
        </>
    );
}
