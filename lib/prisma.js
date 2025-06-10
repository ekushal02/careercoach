import { PrismaClient } from "@prisma/client";

// Use a global variable to avoid creating multiple instances in development (Hot Reload)
const globalForPrisma = globalThis;

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Optional: log queries in dev mode
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
