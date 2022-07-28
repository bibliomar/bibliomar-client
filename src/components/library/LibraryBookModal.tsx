import React, { useState } from "react";
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle,
} from "mdb-react-ui-kit";

import Break from "../general/Break";
import LibraryBookModalBody from "./LibraryBookModalBody";
import { useFormik } from "formik";
import axios from "axios";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import { Book } from "../../helpers/generalTypes";
import { Size } from "../general/useWindowSize";

interface Props {
    coverUrl: string;
    bookInfo: Book;
    bookCategory: string;
    showProp: boolean;
    setShowProp: React.Dispatch<React.SetStateAction<boolean>>;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
    size: Size;
}

export default function LibraryBookModal(props: Props) {
    const book = props.bookInfo;
    const setProgress = props.setProgress;
    const jwtToken = localStorage.getItem("jwt-token");
    // @ts-ignore
    const username = jwt_decode(jwtToken!).sub;

    const [requestStatus, setRequestStatus] = useState<number>(0);

    const formik = useFormik({
        initialValues: { select: props.bookCategory },
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(false);
            const reqBody = [props.bookInfo];
            const config = {
                url: `https://biblioterra.herokuapp.com/v1/library/add/${values.select}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
                data: reqBody,
            };
            try {
                setProgress(50);
                setRequestStatus(103);
                let req = await axios.request(config);
                console.log(req);
                sessionStorage.removeItem(`${username}-user`);
                setProgress(0);
                setRequestStatus(200);
                setTimeout(() => setRequestStatus(0), 2000);
            } catch (e) {
                setRequestStatus(400);
                setTimeout(() => setRequestStatus(0), 2000);
            }
        },
    });
    const colorOnStatus = () => {
        switch (requestStatus) {
            case 0:
                return "primary";
            case 103:
                return "info";
            case 200:
                return "success";
            case 400:
                return "danger";
        }
        return "primary";
    };

    const messageOnStatus = () => {
        switch (requestStatus) {
            case 0:
                return "Salvar";
            case 103:
                return "Atualizando";
            case 200:
                return "Sucesso";
            case 400:
                return "Erro";
        }
    };

    const toggleShow = () => props.setShowProp(!props.showProp);
    return (
        <MDBModal
            show={props.showProp}
            setShow={props.setShowProp}
            className="text-dark"
            tabIndex="-1"
        >
            <MDBModalDialog
                size={props.size.width! < 600 ? "fullscreen-sm-down" : "lg"}
            >
                <MDBModalContent className="bg text-light">
                    <MDBModalHeader>
                        <MDBModalTitle className="d-flex flex-wrap">
                            <span>{book["title"]}</span>
                            <Break />
                            <span
                                className="text-muted fst-italic"
                                style={{ fontSize: "0.8em" }}
                            >
                                {book["authors"]}
                            </span>
                        </MDBModalTitle>
                        <MDBBtn
                            className="btn-close btn-close-white"
                            color="none"
                            onClick={toggleShow}
                        ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <form onSubmit={formik.handleSubmit}>
                            <LibraryBookModalBody
                                coverUrl={props.coverUrl}
                                bookInfo={props.bookInfo}
                                bookCategory={props.bookCategory}
                                formikInstance={formik}
                            />
                        </form>
                    </MDBModalBody>

                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={toggleShow}>
                            Fechar
                        </MDBBtn>
                        <MDBBtn
                            disabled={
                                formik.values.select === props.bookCategory
                            }
                            type="submit"
                            color={colorOnStatus()}
                            onClick={formik.submitForm}
                        >
                            {messageOnStatus()}
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}
