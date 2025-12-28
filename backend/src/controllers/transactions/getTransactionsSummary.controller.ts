import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../../config/prisma';
import type { GetTransactionSummaryQuery } from '../../schemas/transaction.schema';

dayjs.extend(utc);

export const getTransactionsSummary = async (
  request: FastifyRequest<{ Querystring: GetTransactionSummaryQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = 'FJDLKMsdfSDFG234jk34h2';

  if (!userId) {
    reply.status(401).send({ error: 'Usuário não autenticado' });
    return;
  }

  const { month, year } = request.query;

  if (!month || !year) {
    reply.status(400).send({ error: 'Mês e Ano são Obrigatórios' });
    return;
  }

  const startDate = dayjs.utc(`${year}-${month}-01`).startOf('month').toDate();
  const endDate = dayjs.utc(startDate).endOf('month').toDate();

  try {
    const transactons = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    
      include: {
        category: true,
      },
    });

    console.log(transactons);

    reply.send(transactons);
  } catch (err) {
    request.log.error('Erro ao trazer transações', err);
    reply.status(500).send({ error: 'Erro do servidor' });
  }
};
