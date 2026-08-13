import type { FastifyInstance } from 'fastify';
import prisma from '../config/prisma';
import categoryRoutes from './category.routes';
import transactionRoutes from './transaction.routes';

async function routes(fastify: FastifyInstance): Promise<void> {
  // Fora do authMiddleware de propósito: quem consulta é o healthcheck do
  // Docker, que não tem token. Não expõe nada além do estado do banco.
  fastify.get('/health', async (_request, reply) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return { status: 'ok', database: 'up' };
    } catch {
      reply.status(503);
      return { status: 'degraded', database: 'down' };
    }
  });

  fastify.register(categoryRoutes, { prefix: '/categories' });
  fastify.register(transactionRoutes, { prefix: '/transactions' });
}

export default routes;
