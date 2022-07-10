import {
    MDBPagination,
    MDBPaginationItem,
    MDBPaginationLink,
} from "mdb-react-ui-kit";
import { useRef } from "react";

interface Props {
    page: number;
    setPage: any;
    resultsLength: number;
}

export default function Pagination(props: Props) {
    return (
        <div>
            <nav>
                <ul className="pagination bg-black p-2 rounded-7 bg-opacity-50">
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
                                className="text-info"
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
