import { ReactReader } from "react-reader";
import localforage from "localforage";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Book } from "../../../helpers/generalTypes";
import { PossibleReaderScreenStates } from "../helpers/readerTypes";

type BookObjectType = {
    onlineIdentifier: string | undefined | null;
    localIdentifier: string | undefined | null;
    arrayBuffer: ArrayBuffer | undefined | null;
};

export default function () {
    const location = useLocation();
    const params = useParams();
    // @ts-ignore
    const readerState: PossibleReaderScreenStates = location.state;
    let arrayBuffer: ArrayBuffer | undefined = undefined;
    let localInfo: File | undefined = undefined;
    let bookInfo: Book | undefined = undefined;

    if (readerState) {
        arrayBuffer = readerState.arrayBuffer;
        localInfo = readerState.localInfo;
        bookInfo = readerState.bookInfo;
    }

    const defaultBookObject: BookObjectType = {
        onlineIdentifier: bookInfo ? bookInfo!.title : undefined,
        localIdentifier: localInfo ? localInfo?.name : undefined,
        arrayBuffer: arrayBuffer ? arrayBuffer : undefined,
    };

    const [bookObject, setBookObject] =
        useState<BookObjectType>(defaultBookObject);
    /*
    This state is pretty important, because of the way that react-reader works, everytime you render the page (components updating, etc.)
    the handleChange function gets triggered. What this means is that, if you have a epubcifi saved, in say, localStorage, and you define handleChange
    to change it every time the user changes pages (which is not 100% ideal), you lose everything that was saved before handleChange was called.
     */
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
            //After the initial page load, we can save the user's progress normally.
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
            // This function is also called on the very first render, so we just need to set the initial page here.
            setCurrentPage(locationBasedOnCache());
            setInitialLoad(true);
        }
    };

    useEffect(() => {
        /*
         This is a function that saves the current book as "last-book", so that the user can resume it's progress when they leave the website
         and come back at the same URL.
         */

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
                    //Sets initialLoad to a blank state.
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
