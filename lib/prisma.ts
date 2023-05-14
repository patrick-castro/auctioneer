import { PrismaClient } from '@prisma/client'

const globalforPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalforPrisma.prisma || new PrismaClient()

// if (process.env.NODE_ENV !== 'production') globalforPrisma.prisma = prisma

export default prisma
