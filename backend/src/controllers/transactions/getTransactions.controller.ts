import type { FastifyReply, FastifyRequest } from 'fastify';
import type { GetTransactionQuery } from '../../schemas/transaction.schema';
import { error } from 'console';

export const getTransactions = async (
    request: FastifyRequest<{ Querystring: GetTransactionQuery }>,
  reply: FastifyReply,
): Promise<void> => {
    const userId = "sadjfklasjlksadjklfsajd";

    if(!userId) {
        reply.status(401).send({error: "Usuário não autenticado"});
        return;
    }

    
};
