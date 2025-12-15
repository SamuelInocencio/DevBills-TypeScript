import type { FastifyInstance } from 'fastify';
import createTransaction from '../controllers/transactions/createTransactions.controller';
import { zodToJsonSchema } from 'zod-to-json-schema';
import {
  createTransactionSchema,
  getTransactionsSchema,
} from '../schemas/transaction.schema';

const transactionRoutes = async (fastify: FastifyInstance) => {
  // Criação
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: zodToJsonSchema(createTransactionSchema),
    },
    handler: createTransaction,
  });

  //Buscar com Filtros
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      querystring: zodToJsonSchema(getTransactionsSchema),
    },
    handler: getTransactions,
  });
};

export default transactionRoutes;
