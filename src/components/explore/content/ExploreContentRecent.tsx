import { useTranslation } from "react-i18next";
import { Metadata } from "../../general/helpers/generalTypes";
import { useEffect, useState } from "react";
import makeSearch from "../../search/helpers/makeSearch";

function buildRecentSearchObject() {
    const searchObject = {
        index: "libgen",
        query: {
            query_string: "",
        },
        sort: [
            {
                timeadded: "desc",
            },
        ],
        limit: 1000,
    };
    return searchObject;
}

export default function ExploreContentRecent() {
    const recentSearchObject = buildRecentSearchObject();
    const { t } = useTranslation();
    const [searchDone, setSearchDone] = useState<boolean>(false);
    const [results, setResults] = useState<Metadata[]>([]);

    useEffect(() => {
        makeSearch(recentSearchObject).then((response) => {
            if (response) {
                const searchHits = response.hits.hits;
                if (searchHits == undefined || searchHits.length === 0) {
                    setSearchDone(true);
                    return;
                }
            }
        });
    }, []);
}
