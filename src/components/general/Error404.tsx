import Navbar from "./navbar/Navbar";
import Message from "./Message";
import Break from "./Break";

export default function Error404() {
    return (
        <div className="like-body bg-alt">
            <div className="container">
                <Navbar />

                <div className="row mt-5">
                    <div
                        className="col d-flex flex-wrap justify-content-center fw-bold"
                        style={{ width: "80vw" }}
                    >
                        <Break />
                        <p className="note note-danger lead mt-5 fw-bold">
                            Não encontramos o conteúdo que você está procurando,
                            que tal tentar novamente?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
