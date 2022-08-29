import {
    MDBPagination,
    MDBPaginationItem,
    MDBPaginationLink,
} from "mdb-react-ui-kit";
import { useContext, useRef } from "react";
import { Theme } from "../../general/helpers/generalContext";

interface Props {
    page: number;
    setPage: any;
    resultsLength: number;
}

export default function Pagination(props: Props) {
    const theme = useContext(Theme).theme;
    return (
        <div className="mt-3">
            <nav>
                <ul className="pagination p-2 rounded-7 basic-container">
                    <MDBPagination>
                        <MDBPaginationItem>
                            <MDBPaginationLink
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    if (props.page > 0 && props.page !== 1) {
                                        props.setPage(props.page - 1);
                                    }
                                }}
                                href="#"
                                aria-label="Previous"
                                className={
                                    props.page === 1
                                        ? "text-muted disabled-page"
                                        : "text-info"
                                }
                            >
                                <span aria-hidden="true">«</span>
                            </MDBPaginationLink>
                        </MDBPaginationItem>
                        <MDBPaginationItem>
                            <MDBPaginationLink
                                style={{ pointerEvents: "none" }}
                                className="text-color"
                                href="#"
                            >
                                {props.page}
                            </MDBPaginationLink>
                        </MDBPaginationItem>
                        <MDBPaginationItem>
                            <MDBPaginationLink
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    if (
                                        props.page < 100 &&
                                        props.resultsLength >= 25
                                    ) {
                                        props.setPage(props.page + 1);
                                    }
                                }}
                                href="#"
                                aria-label="Next"
                                className={
                                    props.resultsLength < 25
                                        ? "text-muted disabled-page"
                                        : "text-info"
                                }
                            >
                                <span aria-hidden="true">»</span>
                            </MDBPaginationLink>
                        </MDBPaginationItem>
                    </MDBPagination>
                </ul>
            </nav>
        </div>
    );
}
