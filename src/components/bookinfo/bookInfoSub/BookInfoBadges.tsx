import { Book } from "../../general/helpers/generalTypes";
import { MDBBadge } from "mdb-react-ui-kit";

interface Props {
    book: Book;
}

export default function BookInfoBadges({ book }: Props) {
    return (
        <div className="d-flex flex-wrap">
            <MDBBadge className="navbar-badge">AAAAA</MDBBadge>
        </div>
    );
}
