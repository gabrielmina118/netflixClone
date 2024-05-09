/* O SWR (pronunciado "swir") é uma biblioteca popular para React que facilita a gestão de dados em aplicativos que utilizam APIs REST, 
GraphQL ou qualquer outra fonte de dados externa. */
import useSWR from "swr";
import fetcher from "../lib/fetcher";

const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

    return {
        data,
        error,
        isLoading,
        mutate,
    };
};

export default useCurrentUser;
