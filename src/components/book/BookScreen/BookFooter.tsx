import Break from "../../general/Break";

// @ts-ignore
export default function BookFooter({ md5 }) {
    return (
        <div className="row mt-5">
            <div className="col d-flex flex-wrap justify-content-center">
                <span className="bg-black p-2 rounded-7 bg-opacity-75 text-light text-center mb-1">
                    <span className="fw-bold">MD5: </span>

                    <span className="fst-italic">{md5}</span>
                </span>
                <Break />
                <p className="bg-black p-2 rounded-7 bg-opacity-75 text-light text-center">
                    Nosso site lhe foi útil? Considere compartilhar com seus
                    amigos, essa é a forma que o projeto tem de continuar de pé.
                </p>
            </div>
        </div>
    );
}
