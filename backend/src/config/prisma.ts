import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const prismaConnect = async () => {
  try {
    console.log('🔍 Testando conexão MongoDB...');
    await prisma.$connect().then(() => console.log('✅ MongoDB conectado!'));
  } catch (error) {
    console.error('❌ Erro ao conectar:', err);
    process.exit(1); // ✅ Para a aplicação
  }
};

export default prisma;
