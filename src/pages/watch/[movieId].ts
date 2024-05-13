import React from "react";
import useMovie from "../../../hooks/useMovie";
import { useRouter } from "next/router";

const Watch = () => {
    const router = useRouter();
    const { movieId } = router.query;
    const { data } = useMovie(movieId as string);

    return <div clasna></div>;
};

export default Watch;
