import { MDBSpinner } from "mdb-react-ui-kit";

export default function ({ color }: { color?: any }) {
    return (
        <div className="d-flex justify-content-center mt-5">
            <MDBSpinner
                color={color ? color : "light"}
                style={{
                    width: "4rem",
                    height: "4rem",
                }}
            />
        </div>
    );
}
