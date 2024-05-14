import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import NavBarComponent from "@/components/NavBar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import InfoModal from "@/components/infoModal";
import useMovieList from "../../hooks/useMovieList";
import useFavorites from "../../hooks/useFavorites";
import useInfoModal from "../../hooks/useInfoModel";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}

export default function Home() {
    const { data: movies = [] } = useMovieList();
    const { data: favorites = [] } = useFavorites();
    const { isOpen, closeModal } = useInfoModal();
    return (
        <>
            <InfoModal visible={isOpen} onClose={closeModal} />
            <NavBarComponent />
            <Billboard />
            <div className="pb-40">
                <MovieList title="Trending Now" data={movies} />
                <MovieList title="My List" data={favorites} />
            </div>
        </>
    );
}
