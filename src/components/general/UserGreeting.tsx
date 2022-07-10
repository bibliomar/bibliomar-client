import { Link } from "react-router-dom";

interface Jwt {
    username: string;
}

export default function UserGreeting(props: Jwt) {
    return (
        <div className="mb-4">
            <div className="break" />
            <span className="d-flex justify-content-center">
                Bem-vindo, {props.username}!
            </span>
            <div className="break" />
            <Link to="/user/login">
                <button className="btn btn-primary">
                    Entrar na biblioteca
                </button>
            </Link>
        </div>
    );
}
