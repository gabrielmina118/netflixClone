import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../../lib/serverAuth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method != "GET") {
        return res.status(405).end();
    }

    try {
        const { currentUser } = await serverAuth(req,res);

        const favoriteMovies = await prisma.movie.findMany({
            where: {
                id: {
                    in: currentUser.favoriteIds,
                },
            },
        });

        console.log("favoriteMovies", favoriteMovies);

        return res.status(200).json(favoriteMovies);
    } catch (error) {
        console.log("Error endpoint favoriteMovies", error);
        return res.status(400).end();
    }
}
