import { Navigate, Route, Routes } from "react-router-dom";

import Search from "./components/search/Search";
import BookInfoError from "./components/metadatainfo/BookInfoError";
import Login from "./components/login/loginForm/Login";
import Register from "./components/login/registerForm/Register";
import Recover from "./components/login/recoverForm/Recover";
import Error404 from "./components/general/Error404";
import LibraryScreen from "./components/library/LibraryScreen";
import LibraryLanding from "./components/library/LibraryLanding";
import LibraryExpandedScreen from "./components/library/LibraryLandingExpanded";
import ReaderLanding from "./components/reader/ReaderLanding";
import ReaderMain from "./components/reader/screen/ReaderMain";
import BookInfoParent from "./components/metadatainfo/BookInfoParent";
import BookInfoScreen from "./components/metadatainfo/BookInfoScreen";
import BookInfoTopicParent from "./components/metadatainfo/BookInfoTopicParent";
import {
    LibraryCategories,
    ThemeOptions,
} from "./components/general/helpers/generalTypes";
import About from "./components/about/About";
import FAQ from "./components/faq/FAQ";
import { toast, ToastContainer } from "react-toastify";
import { useContext } from "react";
import { ThemeContext } from "./components/general/helpers/generalContext";
import { useTranslation } from "react-i18next";
import { libraryCategoryToLocaleText } from "./components/metadatainfo/helpers/bookinfoFunctions";

function App() {
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();
    return (
        <>
            <Routes>
                <Route path="*" element={<Error404 />} />
                <Route path="error" element={<Error404 />} />
                <Route path="/" element={<Navigate to="/search" />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<FAQ></FAQ>} />
                <Route path="/search" element={<Search />} />
                <Route path="/metadata" element={<BookInfoParent />}>
                    <Route path=":topic" element={<BookInfoTopicParent />}>
                        <Route path=":md5" element={<BookInfoScreen />} />
                    </Route>
                    <Route path="error" element={<BookInfoError />} />
                </Route>
                <Route path="/library" element={<LibraryScreen />}>
                    <Route index element={<LibraryLanding />} />
                    {Object.values(LibraryCategories).map((category, idx) => {
                        return (
                            <Route
                                key={idx}
                                path={category}
                                element={
                                    <LibraryExpandedScreen
                                        title={libraryCategoryToLocaleText(
                                            t,
                                            category
                                        )}
                                        metadataCategory={category}
                                    />
                                }
                            />
                        );
                    })}
                    <Route
                        path="reading"
                        element={
                            <LibraryExpandedScreen
                                title={"Lendo"}
                                metadataCategory={LibraryCategories.reading}
                            />
                        }
                    />
                    <Route
                        path="to-read"
                        element={
                            <LibraryExpandedScreen
                                title={"Planejando ler"}
                                metadataCategory={LibraryCategories.toRead}
                            />
                        }
                    />
                    <Route
                        path="backlog"
                        element={
                            <LibraryExpandedScreen
                                title={"Backlog"}
                                metadataCategory={LibraryCategories.backlog}
                            />
                        }
                    />
                </Route>
                <Route path="/user">
                    <Route index element={<Navigate to="/error" />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="recover" element={<Recover />} />
                </Route>
                <Route path="/reader">
                    <Route index element={<ReaderLanding />} />
                    <Route path=":bookidentifier" element={<ReaderMain />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
