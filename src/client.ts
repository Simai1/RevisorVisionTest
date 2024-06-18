import { PrismaClient } from '@prisma/client';

// add prisma to the NodeJS global type
type CustomNodeJsGlobal = {
	prisma: PrismaClient;
} & Global;

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
