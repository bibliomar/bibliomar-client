import {
    FlowOptions,
    ReaderSettings,
    ReaderThemeAccentOptions,
} from "../../helpers/readerTypes";
import React, { SetStateAction } from "react";
import {
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBRadio,
    MDBSwitch,
} from "mdb-react-ui-kit";
import Break from "../../../general/Break";
import Ellipse from "../../../general/Ellipse";
import {
    chooseThemeAccent,
    managerBasedOnFlow,
    themeColorsObject,
} from "../../helpers/readerFunctions";
import { useFormik } from "formik";
import SmallLine from "../../../general/SmallLine";
import { Size, useWindowSize } from "../../../general/helpers/useWindowSize";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
    readerSettings: ReaderSettings;
    setReaderSettings: React.Dispatch<SetStateAction<ReaderSettings>>;
}

export default function ReaderCustomizeModalBody({
    readerSettings,
    setReaderSettings,
}: Props) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const size: Size = useWindowSize();
    const themeAccent = chooseThemeAccent(readerSettings.themeName);
    const formik = useFormik({
        initialValues: {
            themeName: readerSettings.themeName,
            fontFamily: readerSettings.fontFamily,
            fontSize: readerSettings.fontSize,
            fontWeight: readerSettings.fontWeight,
            swipe: readerSettings.swipe,
            flow: readerSettings.flow,
        },

        onSubmit: (values, formikHelpers) => {
            if (values.flow === FlowOptions.scrolled) {
                values.swipe = false;
            }

            const newReaderSettings: ReaderSettings = {
                ...values,
                fullscreen: readerSettings.fullscreen,
                manager: managerBasedOnFlow(values.flow),
            };
            localStorage.setItem(
                "reader-theme",
                JSON.stringify(newReaderSettings)
            );
            navigate(0);
        },
    });
    const resetSettings = (evt: any) => {
        evt.preventDefault();
        localStorage.removeItem("reader-theme");
        navigate(0);
    };
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="d-flex flex-wrap">
                <h4 className="ms-2 mt-4 w-100 d-flex align-items-center">
                    <MDBIcon fas icon="palette" size="lg" className="me-3" />
                    <span className="simple-text-bolder">
                        {t("reader:themeLabel")}
                    </span>
                    <MDBBtn color={"none"} className="ms-auto btn-close me-2" />
                </h4>
                <Break className="mb-4" />
                <div className="d-flex">
                    {Object.values(themeColorsObject).map((el, index) => {
                        return (
                            <div
                                className="d-flex flex-wrap justify-content-center"
                                key={index}
                            >
                                <label
                                    className="simple-text-bolder"
                                    htmlFor="themeName"
                                >
                                    {el[3]}
                                </label>
                                <Break className="mb-1" />
                                <Ellipse backgroundColorHex={el[1]} />
                                <Break className="mb-2" />
                                <input
                                    name="themeName"
                                    id="themeName"
                                    type="radio"
                                    value={el[3]}
                                    className="form-check-input"
                                    checked={formik.values.themeName === el[3]}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        );
                    })}
                </div>
                <Break className="mb-4" />
                <SmallLine flexGrow className={" rounded"} />
                <Break className="mb-4" />
                <h4 className="ms-2 mt-1">
                    <MDBIcon fas icon="font" size={"lg"} className={"me-3"} />
                    <span className="simple-text-bolder">
                        {t("reader:fontLabel")}
                    </span>
                </h4>
                <Break className="mb-4" />
                <div className="d-flex justify-content-around w-100">
                    <select
                        name={"fontFamily"}
                        id={"fontFamily"}
                        className={"form-select"}
                        style={{ width: "35%" }}
                        value={formik.values.fontFamily}
                        onChange={formik.handleChange}
                    >
                        <option value={"Nunito Sans, sans-serif"}>
                            Nunito Sans
                        </option>
                        <option value={"Times New Roman, sans-serif"}>
                            Times New Roman
                        </option>
                        <option value={"Arial, sans-serif"}>Arial</option>
                        <option value={"Helvetica, sans-serif"}>
                            Helvetica
                        </option>
                    </select>
                    <select
                        name={"fontWeight"}
                        id={"fontWeight"}
                        className={"form-select w-25"}
                        value={formik.values.fontWeight}
                        onChange={formik.handleChange}
                    >
                        <option value={200}>{t("reader:lighter")}</option>
                        <option value={300}>{t("reader:light")}</option>
                        <option value={400}>{t("reader:normal")}</option>
                        <option value={600}>{t("reader:bold")}</option>
                        <option value={700}>{t("reader:bolder")}</option>
                    </select>

                    <MDBInput
                        type={"number"}
                        name={"fontSize"}
                        id={"fontSize"}
                        label={"px"}
                        labelClass={
                            themeAccent === ReaderThemeAccentOptions.light
                                ? "text-dark"
                                : "text-light"
                        }
                        className={
                            themeAccent === ReaderThemeAccentOptions.light
                                ? "text-dark"
                                : "text-light"
                        }
                        wrapperClass={"w-25"}
                        value={formik.values.fontSize}
                        onChange={formik.handleChange}
                    />
                </div>
                <Break className="mb-4" />
                <SmallLine flexGrow className={" rounded"} />
                <Break className="mb-4" />
                <h4 className="ms-2 mt-1">
                    <MDBIcon
                        fas
                        icon={size.width > 768 ? "desktop" : "mobile-alt"}
                        size={"lg"}
                        className={"me-3"}
                    />
                    <span className="simple-text-bolder">
                        {t("reader:readingLabel")}
                    </span>
                </h4>
                <Break className="mb-4" />
                <div className={"d-flex flex-wrap w-100"}>
                    <Break />
                    <div className="d-flex flex-wrap w-100 justify-content-center">
                        <div className="d-flex flex-wrap justify-content-around">
                            <p className="lead">
                                {t("reader:readingModeLabel")}
                            </p>
                            <Break />
                            <div className="d-flex">
                                <div className="d-flex flex-wrap justify-content-center">
                                    <MDBIcon fas icon="file-alt" size={"5x"} />
                                    <Break />
                                    <label htmlFor={"flow"}>
                                        {t("reader:flowPaginatedLabel")}
                                    </label>
                                    <Break />
                                    <MDBRadio
                                        name="flow"
                                        id="flow"
                                        value={FlowOptions.paginated}
                                        checked={
                                            formik.values.flow ===
                                                FlowOptions.default ||
                                            formik.values.flow ===
                                                FlowOptions.paginated
                                        }
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div className="d-flex flex-wrap justify-content-center">
                                    <MDBIcon
                                        fas
                                        icon="file-download"
                                        size={"5x"}
                                    />

                                    <Break />
                                    <label htmlFor={"flow"}>
                                        {t("reader:flowContinuousLabel")}
                                    </label>
                                    <Break />
                                    <MDBRadio
                                        name="flow"
                                        id="flow"
                                        value={FlowOptions.scrolled}
                                        checked={
                                            formik.values.flow ===
                                            FlowOptions.scrolled
                                        }
                                        onChange={formik.handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <Break className="mb-5" />
                        <label htmlFor={"swipe"} className="simple-text-bolder">
                            {t("reader:swipeableLabel")}
                        </label>
                        <Break />
                        <MDBSwitch
                            name={"swipe"}
                            id={"swipe"}
                            checked={
                                formik.values.swipe &&
                                formik.values.flow !== FlowOptions.scrolled
                            }
                            disabled={
                                formik.values.flow === FlowOptions.scrolled
                            }
                            onChange={formik.handleChange}
                        />
                        <Break />
                        <span className={"text-muted"}>
                            {t("reader:swipeableDescription")}
                        </span>
                    </div>
                </div>
                <Break className="mb-4" />
                <SmallLine flexGrow className={" rounded"} />
                <Break className="mb-4" />
                <div className="d-flex flex-wrap justify-content-center w-100">
                    <MDBBtn onClick={resetSettings} color="danger" size="sm">
                        {t("reader:resetConfig")}
                    </MDBBtn>
                    <Break className="mb-2" />
                    <MDBBtn type={"submit"}>{t("reader:saveConfig")}</MDBBtn>
                </div>
            </div>
        </form>
    );
}
