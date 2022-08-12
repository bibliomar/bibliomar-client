import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { replace } from "formik";

export default function BookInfoTopicParent() {
    const params = useParams();
    const navigate = useNavigate();
    const topic = params.topic;
    useEffect(() => {
        if (!topic || (topic !== "fiction" && topic !== "sci-tech")) {
            navigate("/error", { replace: true });
        }
    }, []);

    return <Outlet context={topic} />;
}
