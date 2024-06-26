import { PrismaClient } from '@prisma/client';

type CustomNodeJsGlobal = {
    prisma: PrismaClient;
} & Global;

declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
