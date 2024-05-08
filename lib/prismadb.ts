import { PrismaClient } from "@prisma/client";

// Usando esse global.prisma para o hotReload do node
const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV === "production") {
    global.prismadb = client;
}

export default client;
