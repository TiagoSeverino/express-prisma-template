import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default prismaClient;
export const User = prismaClient.user;
