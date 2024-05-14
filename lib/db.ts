import { PrismaClient } from "@prisma/client";


//simplest way
// declare global {
//     var prisma : PrismaClient | undefined
// }
// export const db = globalThis.prisma || new PrismaClient()

// if (process.env.NODE_ENV !== "production" ) globalThis.prisma = db




//other way
const prismaClientSingleton = () =>{
    return new PrismaClient();
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;


const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};


const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;



//due to hot reload new prisma client will be initialized multiple times
// we are using prisma instead of the prismaclient directly to prevent the connections to get exhaust
// this code sets up a Singleton pattern for the Prisma client instance to ensure there is only one instance
// throughout the application. It exports this instance for use in other modules and also provides 
//a way to access it globally in non-production environments