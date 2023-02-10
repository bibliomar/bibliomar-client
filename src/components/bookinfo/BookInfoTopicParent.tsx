import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { replace } from "formik";

export default function BookInfoTopicParent() {
    const params = useParams();
    const navigate = useNavigate();
    let topic = params.topic;
    useEffect(() => {
        if (
            !topic ||
            (topic !== "fiction" && topic !== "sci-tech" && topic !== "scitech")
        ) {
            navigate("/error", { replace: true });
        }
        if (topic === "scitech") {
            topic = "sci-tech";
        }
    }, []);

    return <Outlet context={topic} />;
}
