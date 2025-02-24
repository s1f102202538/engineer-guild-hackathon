import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query', 'error', 'warn'],
    errorFormat: 'pretty',
  });
};

const prisma = global.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
