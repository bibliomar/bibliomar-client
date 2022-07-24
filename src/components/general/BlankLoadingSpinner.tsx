import { MDBSpinner } from "mdb-react-ui-kit";

export default function () {
    return (
        <div className="d-flex justify-content-center mt-5">
            <MDBSpinner
                color="light"
                style={{
                    width: "4rem",
                    height: "4rem",
                }}
            />
        </div>
    );
}
