import { error } from 'console';
import type { FastifyReply, FastifyRequest } from 'fastify';

const createTransaction = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const userId = 'FJDLKMsdfSDFG234jk34h2';

  if (!userId) {
    reply.status(401).send({ error: 'Usuário não autenticado' });
  }
};

export default createTransaction;
