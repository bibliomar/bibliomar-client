import { MDBInput } from "mdb-react-ui-kit";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Fuse from "fuse.js";

type IndexesResponse = {
    indexes: string[];
};

async function getIndexes(category: string) {
    if (sessionStorage.getItem(`${category}-indexes`)) {
        let cachedIndexesJson = sessionStorage.getItem(
            `${category}-indexes`
        ) as string;
        return JSON.parse(cachedIndexesJson);
    }
    try {
        let indexRequest = await axios.get(
            `https://biblioterra.herokuapp.com/v1/indexes/${category}`
        );
        let indexesObject: IndexesResponse = indexRequest.data;
        let indexes = indexesObject.indexes;
        sessionStorage.setItem(`${category}-indexes`, JSON.stringify(indexes));
        return indexes;
    } catch (e) {
        console.log(e);
    }
}

//@ts-ignore
export default function SearchBar({ categoryContext }) {
    let [searchParameters, _] = useSearchParams();
    let [query, setQuery] = useState("");
    let [indexes, setIndexes] = useState([]);
    let [relevantIndexes, setRelevantIndexes] = useState<any[]>([]);
    let fuse: Fuse<any>;

    useEffect(() => {
        let q = searchParameters.get("q");
        if (q != null) {
            setQuery(q);
        }
    }, [searchParameters]);

    useEffect(() => {
        if (categoryContext !== "any") {
            getIndexes(categoryContext).then((r) => {
                setIndexes(r);
            });
        } else {
            getIndexes("fiction").then((r) => {
                setIndexes(r);
            });
        }
    }, [categoryContext]);

    async function handleSearch(input: HTMLInputElement) {
        setQuery(input.value);
        if (query.length > 2) {
            fuse = new Fuse(indexes, { keys: ["title"] });
            let search = fuse.search(input.value);
            setRelevantIndexes(search);
        }
    }

    return (
        <div className="input-group d-flex justify-content-center mt-5 mb-4">
            <div className="form-outline searchfield">
                <datalist id="indexes">
                    {relevantIndexes.map((el, i) => {
                        if (i < 5) {
                            return <option value={el.item.title} key={i} />;
                        }
                    })}
                </datalist>
                <MDBInput
                    value={query}
                    onChange={(evt) => handleSearch(evt.currentTarget)}
                    list="indexes"
                    type="text"
                    className="text-light"
                    label="Pesquisar"
                    labelClass="text-light"
                    name="q"
                    autoComplete="true"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                <i className="fas fa-search"></i>
            </button>
        </div>
    );
}
