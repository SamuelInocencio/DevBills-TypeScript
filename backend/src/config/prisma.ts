// import { PrismaClient } from '@prisma/client';

// // Inicializa o cliente Prisma
// export const prisma = new PrismaClient();

// export const prismaConnect = async () => {
//   try {
//     await prisma.$connect();
//     console.log('✅ DB conectado com sucesso!');
//   } catch (err) {
//     console.error('🚨 Falha ao conectar o DB:', err);
//     // Opcionalmente, você pode querer lançar o erro novamente para tratamento externo
//     throw err;
//   }
// };


import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const prismaConnect = async () => {
  try {
    await prisma.$connect();
  console.log("✅ DB conectado com sucesso");
  } catch (error) {
    console.log("🚨 Erro ao conectar ao servidor");
  }
};

export default prisma;