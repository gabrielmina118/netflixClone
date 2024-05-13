import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method != "POST") {
        return res.status(405).end();
    }

    try {
        const { email, name, password } = req.body;

        const emailAlreadyExist = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (emailAlreadyExist) {
            return res.status(422).json({ error: "Email already register" });
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashPassword: hashPassword,
                image: "",
                favoriteIds: [],
                emailVerified: new Date(),
            },
        });

        return res.status(201).json(user);
    } catch (error) {
        console.log("Error endpoint register", error);
        return res.status(400).end();
    }
}
