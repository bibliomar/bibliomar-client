import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Search = lazy(() => import("./components/search/Search"));
const BookInfoError = lazy(
    () => import("./components/metadatainfo/MetadataInfoError")
);
const Login = lazy(() => import("./components/user/loginForm/Login"));
const Register = lazy(() => import("./components/user/registerForm/Register"));
const Recover = lazy(() => import("./components/user/recoverForm/Recover"));
const Error404 = lazy(() => import("./components/general/Error404"));
const LibraryScreen = lazy(() => import("./components/library/LibraryScreen"));
const LibraryLanding = lazy(
    () => import("./components/library/LibraryLanding")
);
const LibraryExpandedScreen = lazy(
    () => import("./components/library/LibraryLandingExpanded")
);
const ReaderLanding = lazy(() => import("./components/reader/ReaderLanding"));
const ReaderMain = lazy(() => import("./components/reader/screen/ReaderMain"));
// lazy load these components
// use suspense fallbacks if possible
// TODO: check if react-router's loader implementation is feasible
const MetadataInfoParent = lazy(
    () => import("./components/metadatainfo/MetadataInfoParent")
);
const MetadataInfoScreen = lazy(
    () => import("./components/metadatainfo/MetadataInfoScreen")
);
const MetadataInfoTopic = lazy(
    () => import("./components/metadatainfo/MetadataInfoTopic")
);
const Explore = lazy(() => import("./components/explore/Explore"));
const About = lazy(() => import("./components/about/About"));
const FAQ = lazy(() => import("./components/faq/FAQ"));

import {
    LibraryCategories,
    ThemeOptions,
} from "./components/general/helpers/generalTypes";

import { toast, ToastContainer } from "react-toastify";
import { useContext } from "react";
import { ThemeContext } from "./components/general/helpers/generalContext";
import { useTranslation } from "react-i18next";
import { libraryCategoryToLocaleText } from "./components/general/helpers/generalFunctions";
import SuspenseLoadingSpinner from "./components/general/SuspenseLoadingSpinner";

function App() {
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();
    return (
        <Suspense fallback={<SuspenseLoadingSpinner />}>
            <Routes>
                <Route path="*" element={<Error404 />} />
                <Route path="error" element={<Error404 />} />
                <Route path="/" element={<Navigate to="/search" replace />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<FAQ></FAQ>} />
                <Route path="/search" element={<Search />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/metadata" element={<MetadataInfoParent />}>
                    <Route path=":topic" element={<MetadataInfoTopic />}>
                        <Route path=":md5" element={<MetadataInfoScreen />} />
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
        </Suspense>
    );
}

export default App;
