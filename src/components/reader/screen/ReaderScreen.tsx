import { ReactReader } from "react-reader";
import localforage from "localforage";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PossibleReaderStates } from "../ReaderLanding";
import { Book } from "../../search/Search";

type BookObjectType = {
    onlineIdentifier: string | undefined | null;
    localIdentifier: string | undefined | null;
    arrayBuffer: ArrayBuffer | undefined | null;
};

export default function () {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    // @ts-ignore
    const readerState: PossibleReaderStates = location.state;
    let arrayBuffer: ArrayBuffer | undefined = undefined;
    let localInfo: File | undefined = undefined;
    let bookInfo: Book | undefined = undefined;

    if (readerState) {
        arrayBuffer = readerState.arrayBuffer;
        localInfo = readerState.localInfo;
        bookInfo = readerState.bookInfo;
    }

    console.log(readerState);

    const defaultBookObject: BookObjectType = {
        onlineIdentifier: bookInfo ? bookInfo!.title : undefined,
        localIdentifier: localInfo ? localInfo?.name : undefined,
        arrayBuffer: arrayBuffer ? arrayBuffer : undefined,
    };

    const [bookObject, setBookObject] =
        useState<BookObjectType>(defaultBookObject);
    console.log(bookObject);
    const [initialLoad, setInitialLoad] = useState<boolean>(false);

    const locationBasedOnCache = () => {
        const onlineID = bookObject.onlineIdentifier;
        const localID = bookObject.localIdentifier;
        const onlineCache = localStorage.getItem(`${onlineID}-page`);
        const localCache = localStorage.getItem(`${localID}-page`);
        return onlineCache ? onlineCache : localCache ? localCache : undefined;
    };

    const [currentPage, setCurrentPage] = useState<
        string | number | undefined | null
    >(undefined);

    const handleChange = (epubcifi: any) => {
        if (initialLoad) {
            if (bookObject.onlineIdentifier != null) {
                localStorage.setItem(
                    `${bookObject.onlineIdentifier}-page`,
                    epubcifi
                );
            } else if (bookObject.localIdentifier != null) {
                localStorage.setItem(
                    `${bookObject.localIdentifier}-page`,
                    epubcifi
                );
            }
            setCurrentPage(locationBasedOnCache());
        } else {
            setCurrentPage(locationBasedOnCache());
            setInitialLoad(true);
        }
    };

    /*
    For some reason, using useEffect to change the page on initial render breaks stuff...

    useEffect(() => {
        setCurrentPage(locationBasedOnCache());
        setInitialLoad(true);
    }, []);

     */

    useEffect(() => {
        const ls = localforage.createInstance({
            driver: localforage.INDEXEDDB,
        });
        if (readerState) {
            const thisBookObject = {
                onlineIdentifier: bookInfo ? bookInfo.title : undefined,
                localIdentifier: localInfo ? localInfo.name : undefined,
                arrayBuffer: arrayBuffer,
            };
            if (arrayBuffer != null) {
                console.log("tries to save");
                ls.setItem("last-book", thisBookObject)
                    .then()
                    .catch((e) => console.error(e));
            }
        } else {
            ls.getItem(`last-book`).then((r: any) => {
                if (
                    params.bookname === r.onlineIdentifier ||
                    params.bookname === r.localIdentifier
                ) {
                    const fallbackBookObject: BookObjectType = {
                        onlineIdentifier: r.onlineIdentifier,
                        localIdentifier: r.localIdentifier,
                        arrayBuffer: r.arrayBuffer,
                    };
                    setInitialLoad(false);
                    setBookObject(fallbackBookObject);
                }
            });
        }
    }, []);

    return (
        <div style={{ height: "100vh" }}>
            <ReactReader
                location={currentPage!}
                locationChanged={handleChange}
                url={bookObject.arrayBuffer!}
            />
        </div>
    );
}
