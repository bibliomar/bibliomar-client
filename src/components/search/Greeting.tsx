import jwt_decode, { JwtPayload } from "jwt-decode";
import GuestGreeting from "../general/GuestGreeting";
import UserGreeting from "../general/UserGreeting";

interface Props {
    isUserLoggedContext: boolean;
}

export default function Greeting(props: Props) {
    // The greeting sub-components are not being used because a navbar has been implemented.
    function isUserLoggedIn() {
        if (props.isUserLoggedContext) {
            let token = localStorage.getItem("jwt-token") as string;
            let decoded_token = jwt_decode(token) as JwtPayload;
            return (
                <div className="lead text-secondary">
                    Bem vindo,{" "}
                    <span className="text-light">{decoded_token.sub}!</span>
                </div>
            );
        }

        return (
            <p className="greeting-text mt-2">
                Pesquise e leia milhares de livros em um só lugar
            </p>
        );
    }
    return (
        <div className="d-flex flex-wrap justify-content-center mb-5">
            <div className="break" />
            {isUserLoggedIn()}
            <div className="break" />
        </div>
    );
}
