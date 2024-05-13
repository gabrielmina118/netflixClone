import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { without } from "lodash";
import serverAuth from "../../../lib/serverAuth";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "POST") {
            const { currentUser } = await serverAuth(req,res);

            console.log("currentUser", currentUser);

            const { movieId } = req.body;

            const existFilm = await prisma.movie.findUnique({
                where: {
                    id: movieId,
                },
            });

            if (!existFilm) {
                throw new Error("Invalid ID");
            }

            const user = await prisma.user.update({
                where: {
                    email: currentUser.email || "",
                },
                data: {
                    favoriteIds: {
                        push: movieId,
                    },
                },
            });

            return res.status(200).json(user);
        }

        if (req.method === "DELETE") {
            const { currentUser } = await serverAuth(req,res);

            const { movieId } = req.body;

            const existFilm = await prisma.movie.findUnique({
                where: {
                    id: movieId,
                },
            });

            if (!existFilm) {
                throw new Error("Invalid ID");
            }

            const updateFavoriteIds = without(currentUser.favoriteIds, movieId);

            const updateUser = await prisma.user.update({
                where: {
                    email: currentUser.email || "",
                },
                data: {
                    favoriteIds: updateFavoriteIds,
                },
            });

            return res.status(200).json(updateUser);
        }

        return res.status(405).end();
    } catch (error) {
        console.log("Error endpoint favorite", error);
        return res.status(400).end();
    }
}
