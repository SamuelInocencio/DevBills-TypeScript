import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const prismaConnect = async () => {
  try {
    await prisma.$connect();
    console.log('✅ DB conectado com sucesso');
  } catch (error) {
    console.log('🚨 Erro ao conectar ao servidor');
  }
};

export default prisma;