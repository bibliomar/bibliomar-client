import { MDBTypography } from "mdb-react-ui-kit";
import Break from "../../general/Break";
import { ReactNode } from "react";

interface LoadingMessage {
    message: string | ReactNode;
    noteColor: string;
}

export default function SearchLoadingMessage({
    message,
    noteColor,
}: LoadingMessage) {
    return (
        <div className="d-flex justify-content-center">
            <MDBTypography note noteColor={noteColor as "primary"}>
                {message}
            </MDBTypography>
        </div>
    );
}
