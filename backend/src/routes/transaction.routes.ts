import type { FastifyInstance } from 'fastify';
import createTransaction from '../controllers/transactions/createTransactions.controller';
import { deleteTransaction } from '../controllers/transactions/deleteTransaction.controller';
import { getHistoricalTrasactions } from '../controllers/transactions/getHistoricalTransactions.controller';
import { getTransactions } from '../controllers/transactions/getTransactions.controller';
import { getTransactionsSummary } from '../controllers/transactions/getTransactionsSummary.controller';
import { authMiddleware } from '../middlewares/auth.middlewares';
import {
  createTransactionSchema,
  deleteTransactionSchema,
  getHistoricalTransactionsSchema,
  getTransactionsSchema,
  getTransactionsSummarySchema,
} from '../schemas/transaction.schema';
import { toJsonSchema } from '../utils/toJsonSchema';

const transactionRoutes = async (fastify: FastifyInstance) => {
  fastify.addHook('preHandler', authMiddleware);
  // Criação
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: toJsonSchema(createTransactionSchema),
    },
    handler: createTransaction,
  });

  //Buscar com Filtros
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      querystring: toJsonSchema(getTransactionsSchema),
    },
    handler: getTransactions,
  });

  //Buscar o resumo
  fastify.route({
    method: 'GET',
    url: '/summary',
    schema: {
      querystring: toJsonSchema(getTransactionsSummarySchema),
    },
    handler: getTransactionsSummary,
  });

  //Histórico de transações
  fastify.route({
    method: 'GET',
    url: '/historical',
    schema: {
      querystring: toJsonSchema(getHistoricalTransactionsSchema),
    },
    handler: getHistoricalTrasactions,
  });

  //Deletar transação

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: {
      params: toJsonSchema(deleteTransactionSchema),
    },
    handler: deleteTransaction,
  });
};

export default transactionRoutes;
