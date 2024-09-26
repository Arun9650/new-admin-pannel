/* eslint-disable no-var */
import { PrismaClient as PrismaClient1 } from "@/../prisma/generated/client1";
import { PrismaClient as PrismaClient2 } from "@/../prisma/generated/client2";

declare global {
  // eslint-disable-next-line no-var
  var prisma1: PrismaClient1 | undefined;
  var prisma2: PrismaClient2 | undefined;
}

// Singleton pattern for the first Prisma client (Database 1)
const prismaClientSingleton1 = (): PrismaClient1 => {
  return new PrismaClient1({
    datasources: { db: { url: process.env.DATABASE_URL_1 } },
  });
};

// Singleton pattern for the second Prisma client (Database 2)
const prismaClientSingleton2 = (): PrismaClient2 => {
  return new PrismaClient2({
    datasources: { db: { url: process.env.DATABASE_URL_2 } },
  });
};

// Export clients, reusing them if already instantiated
export const prisma1 = global.prisma1 || prismaClientSingleton1();
export const prisma2 = global.prisma2 || prismaClientSingleton2();

// Prevent new instances in development mode
if (process.env.NODE_ENV !== "production") {
  global.prisma1 = prisma1;
  global.prisma2 = prisma2;
}

// Export the client to be used with NextAuth (assuming prisma1 is for auth)
export const authPrisma = prisma1;