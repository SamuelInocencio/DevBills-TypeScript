import type { FastifyInstance } from 'fastify';
import createTransaction from '../controllers/transactions/createTransactions.controller';

const transactionRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {},
    handler: createTransaction,
  });
};

export default transactionRoutes;
