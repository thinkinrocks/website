import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString =
  import.meta.env.DATABASE_URL || import.meta.env.DATABASE_URL_UNPOOLED;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL or DATABASE_URL_UNPOOLED");
}

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
  prismaPool?: Pool;
};

const pool =
  globalForPrisma.prismaPool ??
  new Pool({
    connectionString,
  });

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(pool),
  });

if (import.meta.env.DEV) {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaPool = pool;
}