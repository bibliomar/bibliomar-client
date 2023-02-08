import {
    MDBBtn,
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarItem,
    MDBNavbarLink,
} from "mdb-react-ui-kit";
import { Portal } from "react-portal";
import {
    ReaderNavbarProps,
    ReaderThemeAccentOptions,
} from "../helpers/readerTypes";
import ReaderCustomizeModal from "./customize/ReaderCustomizeModal";
import { useEffect, useState } from "react";
import BibliomarBrand from "../../general/navbar/BibliomarBrand";
import { useTranslation } from "react-i18next";

export default function ReaderNavbar({
    readerSettings,
    setReaderSettings,
    readerAccent,
}: ReaderNavbarProps) {
    const { t } = useTranslation();
    const [modalToggle, setModalToggle] = useState<boolean>(false);

    useEffect(() => {}, []);

    return (
        <div
            className={`w-100 h-100 ${
                readerSettings.fullscreen ? "visually-hidden" : ""
            }`}
        >
            <Portal node={document.getElementById("modal-root")}>
                <ReaderCustomizeModal
                    modalToggle={modalToggle}
                    setModalToggle={setModalToggle}
                    readerSettings={readerSettings}
                    setReaderSettings={setReaderSettings}
                />
            </Portal>
            <MDBNavbar
                expand
                className=""
                style={{
                    background:
                        readerAccent === ReaderThemeAccentOptions.light
                            ? "#FAFAFA"
                            : "#252525",
                    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.03)",
                    borderBottom:
                        readerAccent === ReaderThemeAccentOptions.light
                            ? "4px solid #EEEEEE"
                            : "4px solid #383838",
                }}
            >
                <MDBContainer fluid className="d-flex flex-nowrap w-100">
                    <MDBNavbarBrand
                        className="ms-4 reader-navbar-brand"
                        href="/reader"
                    >
                        <BibliomarBrand
                            readerAccent={readerAccent}
                            badgeText={"reader"}
                        />
                    </MDBNavbarBrand>

                    <MDBNavbarLink className="ms-auto ">
                        <MDBBtn onClick={() => setModalToggle(true)}>
                            {t("reader:aparncia")}
                        </MDBBtn>
                    </MDBNavbarLink>
                </MDBContainer>
            </MDBNavbar>
        </div>
    );
}
