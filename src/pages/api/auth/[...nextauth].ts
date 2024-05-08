import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

import prismadb from "../../../../lib/prismadb";
import { compare } from "bcrypt";

export default NextAuth({
    providers: [
        Credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
           
                const user = await prismadb.netflixUser.findUnique({
                    where: {
                        email: credentials?.email,
                    },
                });

                console.log("user", user);

                if (!user || !user.hashPassword) {
                    throw new Error("Email doest not exist");
                }

                const isCorrectPassword = await compare(
                    credentials?.password,
                    user.hashPassword
                );

                if (!isCorrectPassword) {
                    throw new Error("Incorrect password");
                }

                return user;
            },
        }),
    ],
    pages: {
        signIn: "/auth",
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
});
