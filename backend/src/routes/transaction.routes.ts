import type { FastifyInstance } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import createTransaction from '../controllers/transactions/createTransactions.controller';
import { getTransactions } from '../controllers/transactions/getTransactions.controller';
import { getTransactionsSummary } from '../controllers/transactions/getTransactionsSummary.controller';
import {
  createTransactionSchema,
  getTransactionsSchema,
  getTransactionsSummarySchema,
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

  //Buscar o resumo
  fastify.route({
    method: 'GET',
    url: '/summary',
    schema: {
      querystring: zodToJsonSchema(getTransactionsSummarySchema),
    },
    handler: getTransactionsSummary,
  });
};

export default transactionRoutes;
