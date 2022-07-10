import { Link } from "react-router-dom";
import Break from "./Break";

export default function GuestGreeting() {
    return (
        <div className="mb-4">
            <span className="d-flex justify-content-center">Bem-vindo!</span>
            <Break />
            <Link to="/user/login">
                <button className="btn btn-primary">login ou cadastro</button>
            </Link>
        </div>
    );
}
