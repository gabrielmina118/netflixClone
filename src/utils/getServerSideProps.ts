import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

//Identificação da sessão , caso o usuário não esteja logado , não consegue entrar na pagina
export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect:{
                destination:'/auth',
                permanent:false
            },
        };
    }

    return {
        props:{}
    }
}
