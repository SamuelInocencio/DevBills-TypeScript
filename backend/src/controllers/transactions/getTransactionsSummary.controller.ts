import type { FastifyReply, FastifyRequest } from 'fastify';
import type { GetTransactionSummaryQuery } from '../../schemas/transaction.schema';

export const getTransactionsSummary = async (
  request: FastifyRequest<{ Querystring: GetTransactionSummaryQuery }>,
  reply: FastifyReply,
): Promise<void> => {
    
};
