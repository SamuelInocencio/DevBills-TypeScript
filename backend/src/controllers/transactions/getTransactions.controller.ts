import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type { FastifyReply, FastifyRequest } from 'fastify';

import prisma from '../../config/prisma';
import type { GetTransactionQuery } from '../../schemas/transaction.schema';

import { TransactionFilter } from '../../types/transaction.schema';

dayjs.extend(utc);

export const getTransactions = async (
  request: FastifyRequest<{ Querystring: GetTransactionQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = request.userId;

  if (!userId) {
    reply.status(401).send({ error: 'Usuário não autenticado' });
    return;
  }

  const { month, year, type, categoryId } = request.query;

  const filters: TransactionFilter = { userId };

  if (month && year) {
    const startDate = dayjs
      .utc(`${year}-${month}-01`)
      .startOf('month')
      .toDate();
    const endDate = dayjs.utc(startDate).endOf('month').toDate();
    filters.date = { gte: startDate, lte: endDate };
  }

  if (type) {
    filters.type = type;
  }

  if (categoryId) {
    filters.categoryId = categoryId;
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: filters,
      orderBy: { date: 'desc' },
      include: {
        category: {
          select: {
            color: true,
            name: true,
            type: true,
          },
        },
      },
    });

    // amount é Decimal e serializaria como string em JSON; o contrato da API
    // é number, então converte antes de responder.
    reply.send(
      transactions.map((transaction) => ({
        ...transaction,
        amount: transaction.amount.toNumber(),
      })),
    );
  } catch (err) {
    request.log.error({ err }, 'Erro ao trazer transações');
    reply.status(500).send({ error: 'Erro do servidor' });
  }
};
