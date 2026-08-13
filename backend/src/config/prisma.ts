import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const prismaConnect = async () => {
  try {
    console.log('🔍 Testando conexão PostgreSQL...');
    await prisma.$connect();

    // O $connect() pode não tocar o servidor de fato.
    // Só uma query real confirma que o banco está acessível.
    await prisma.$queryRaw`SELECT 1`;

    console.log('✅ PostgreSQL conectado!');
  } catch (err) {
    console.error('❌ Erro ao conectar:', err);
    process.exit(1); // ✅ Para a aplicação
  }
};

export default prisma;
