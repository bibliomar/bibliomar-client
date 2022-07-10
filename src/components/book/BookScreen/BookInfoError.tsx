// @ts-ignore
import { MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Break from "../../general/Break";

// @ts-ignore
function FallbackDownload({ mirror }) {
    return (
        <div>
            <p>Ou baixar diretamente no site do LibraryGenesis:</p>
            <Break />
            <MDBBtn>
                <Link to={mirror} />
            </MDBBtn>
        </div>
    );
}

interface Props {
    mirror?: string;
}

export default function BookInfoError(props: Props) {
    return (
        <div className="d-flex flex-wrap justify-content-center">
            <span>
                Desculpe, não conseguimos recuperar os links desse arquivo.
            </span>
            <Break />
            <p>Você pode tentar recarregar a página.</p>
            <Break />
            {props.mirror ? <FallbackDownload mirror={props.mirror} /> : <></>}
        </div>
    );
}
