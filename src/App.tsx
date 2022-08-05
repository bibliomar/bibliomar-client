import { Routes, Route, Navigate } from "react-router-dom";

import Search from "./components/search/Search";
import BookError from "./components/book/BookError";
import BookFictionParent from "./components/book/BookFictionParent";
import BooksParent from "./components/book/BooksParent";
import BookScitechParent from "./components/book/BookScitechParent";
import BookScreen from "./components/book/BookScreen/BookScreen";
import Login from "./components/login/loginForm/Login";
import Register from "./components/login/registerForm/Register";
import Recover from "./components/login/recoverForm/Recover";
import Error404 from "./components/general/Error404";
import LibraryParent from "./components/library/LibraryParent";
import LibraryLanding from "./components/library/LibraryLanding";
import LibraryExpandedScreen from "./components/library/expanded/LibraryExpandedView";
import ReaderLanding from "./components/reader/ReaderLanding";
import ReaderMain from "./components/reader/screen/ReaderMain";
import BookInfoParent from "./components/bookinfo/BookInfoParent";
import BookInfoScreen from "./components/bookinfo/BookInfoScreen";

function App() {
    return (
        <Routes>
            <Route path="*" element={<Error404 />} />
            <Route path="error" element={<Error404 />} />
            <Route path="/" element={<Navigate to="/search" />} />
            <Route path="/search" element={<Search />} />
            <Route path="/book" element={<BookInfoParent />}>
                <Route index element={<></>} />
                <Route path=":md5" element={<BookInfoScreen />} />
                <Route path="error" element={<BookError />} />
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
                <Route path=":bookname" element={<ReaderMain />} />
            </Route>
        </Routes>
    );
}

export default App;
