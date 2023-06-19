import { PrismaClient } from '@prisma/client'


/**
 * The Prisma client instance for database operations.
 */
export const prisma = new PrismaClient({
  log: ['query'],
})
