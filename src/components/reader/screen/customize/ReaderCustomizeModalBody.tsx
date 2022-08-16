import {
    FlowOptions,
    ReaderSettings,
    ReaderThemeAccentOptions,
} from "../../helpers/readerTypes";
import React, { MouseEventHandler, SetStateAction } from "react";
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

interface Props {
    readerSettings: ReaderSettings;
    setReaderSettings: React.Dispatch<SetStateAction<ReaderSettings>>;
}

export default function ReaderCustomizeModalBody({
    readerSettings,
    setReaderSettings,
}: Props) {
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
    console.log(formik.values);
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="d-flex flex-wrap">
                <h4 className="ms-2 mt-4">
                    <MDBIcon fas icon="palette" size="lg" className="me-3" />
                    <span className="basic-text">Tema</span>
                </h4>
                <Break className="mb-4" />
                <div className="d-flex">
                    {Object.values(themeColorsObject).map((el) => {
                        return (
                            <div className="d-flex flex-wrap justify-content-center">
                                <label
                                    className="basic-text"
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
                    <span className="basic-text">Fonte</span>
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
                        <option value={200}>Mais leve</option>
                        <option value={300}>Leve</option>
                        <option value={400}>Normal</option>
                        <option value={600}>Negrito</option>
                        <option value={700}>Mais negrito</option>
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
                        icon={size.width > 600 ? "desktop" : "mobile-alt"}
                        size={"lg"}
                        className={"me-3"}
                    />
                    <span className="basic-text">Leitura</span>
                </h4>
                <Break className="mb-4" />
                <div className={"d-flex flex-wrap w-100"}>
                    <Break />
                    <div className="d-flex flex-wrap w-100 justify-content-center">
                        <div className="d-flex flex-wrap justify-content-around">
                            <p className="lead">Modo de leitura</p>
                            <Break />
                            <div className="d-flex">
                                <div className="d-flex flex-wrap justify-content-center">
                                    <MDBIcon fas icon="file-alt" size={"5x"} />
                                    <Break />
                                    <label htmlFor={"flow"}>Paginada</label>
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
                                    <label htmlFor={"flow"}>Contínua</label>
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
                        <label htmlFor={"swipe"}>Deslizável</label>
                        <Break />
                        <MDBSwitch
                            name={"swipe"}
                            id={"swipe"}
                            checked={formik.values.swipe}
                            onChange={formik.handleChange}
                        />
                        <Break />
                        <span className={"text-muted"}>
                            Ativa o deslizamento por gesto. Desativa a seleção
                            de texto.
                        </span>
                    </div>
                </div>
                <Break className="mb-4" />
                <SmallLine flexGrow className={" rounded"} />
                <Break className="mb-4" />
                <div className="d-flex flex-wrap justify-content-center w-100">
                    <MDBBtn onClick={resetSettings} color="danger" size="sm">
                        Restaurar configurações
                    </MDBBtn>
                    <Break className="mb-2" />
                    <MDBBtn type={"submit"}>Salvar alterações</MDBBtn>
                </div>
            </div>
        </form>
    );
}
