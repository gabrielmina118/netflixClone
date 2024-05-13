import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../../../lib/serverAuth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    try {
        await serverAuth(req,res);
        const movies = await prisma.movie.findMany();

        return res.status(200).json(movies);
    } catch (error) {
        console.log("Error in current movies api", error);
        return res.status(400).end();
    }
}
