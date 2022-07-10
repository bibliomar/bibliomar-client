import { Link } from "react-router-dom";
import Break from "../../../general/Break";

interface Props {
    topic: string;
    md5: string;
}

export default function BookLoginNeeded(props: Props) {
    return (
        <>
            <Break />
            <Link to={`/user/login?redirect=/book/${props.topic}/${props.md5}`}>
                <button className="btn btn-secondary mt-2">fazer login</button>
            </Link>
        </>
    );
}
