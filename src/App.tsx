import { Routes, Route, Navigate } from "react-router-dom";

import Search from "./components/search/Search";
import BookInfoError from "./components/bookinfo/BookInfoError";
import Login from "./components/login/loginForm/Login";
import Register from "./components/login/registerForm/Register";
import Recover from "./components/login/recoverForm/Recover";
import Error404 from "./components/general/Error404";
import LibraryParent from "./components/library/LibraryParent";
import LibraryLanding from "./components/library/LibraryLanding";
import LibraryExpandedScreen from "./components/library/LibraryExpandedView";
import ReaderLanding from "./components/reader/ReaderLanding";
import ReaderMain from "./components/reader/screen/ReaderMain";
import BookInfoParent from "./components/bookinfo/BookInfoParent";
import BookInfoScreen from "./components/bookinfo/BookInfoScreen";
import BookInfoTopicParent from "./components/bookinfo/BookInfoTopicParent";

function App() {
    return (
        <Routes>
            <Route path="*" element={<Error404 />} />
            <Route path="error" element={<Error404 />} />
            <Route path="/" element={<Navigate to="/search" />} />
            <Route path="/search" element={<Search />} />
            <Route path="/book" element={<BookInfoParent />}>
                <Route path=":topic" element={<BookInfoTopicParent />}>
                    <Route path=":md5" element={<BookInfoScreen />} />
                </Route>
                <Route path="error" element={<BookInfoError />} />
            </Route>
            <Route path="/library" element={<LibraryParent />}>
                <Route index element={<LibraryLanding />} />
                <Route
                    path="reading"
                    element={
                        <LibraryExpandedScreen
                            message={"Lendo"}
                            bookCategory={"reading"}
                        />
                    }
                />
                <Route
                    path="to-read"
                    element={
                        <LibraryExpandedScreen
                            message={"Planejando ler"}
                            bookCategory={"to-read"}
                        />
                    }
                />
                <Route
                    path="backlog"
                    element={
                        <LibraryExpandedScreen
                            message={"Backlog"}
                            bookCategory={"backlog"}
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
    );
}

export default App;
