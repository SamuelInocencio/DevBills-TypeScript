import { Prisma, TransactionType } from '@prisma/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../../config/prisma';
import type { GetTransactionSummaryQuery } from '../../schemas/transaction.schema';
import type { CategorySummary } from '../../types/category.types';
import type { TransactionSummary } from '../../types/transaction.schema';

dayjs.extend(utc);

// Acumulador interno: mantém o amount em Decimal enquanto soma.
// O CategorySummary exposto na resposta continua com amount: number.
type GroupedExpense = Omit<CategorySummary, 'amount' | 'percentage'> & {
  amount: Prisma.Decimal;
};

export const getTransactionsSummary = async (
  request: FastifyRequest<{ Querystring: GetTransactionSummaryQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = request.userId;

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
    const transactions = await prisma.transaction.findMany({
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

    // A soma é feita em Decimal para não acumular erro de ponto flutuante;
    // a conversão para number acontece só na montagem da resposta.
    let totalExpenses = new Prisma.Decimal(0);
    let totalIncomes = new Prisma.Decimal(0);
    const groupedExpenses = new Map<string, GroupedExpense>();

    for (const transaction of transactions) {
      if (transaction.type === TransactionType.expense) {
        const existing = groupedExpenses.get(transaction.categoryId) ?? {
          categoryId: transaction.categoryId,
          categoryName: transaction.category.name,
          categoryColor: transaction.category.color,
          amount: new Prisma.Decimal(0),
        };

        existing.amount = existing.amount.add(transaction.amount);
        groupedExpenses.set(transaction.categoryId, existing);

        totalExpenses = totalExpenses.add(transaction.amount);
      } else {
        totalIncomes = totalIncomes.add(transaction.amount);
      }
    }

    const summary: TransactionSummary = {
      totalExpenses: totalExpenses.toNumber(),
      totalIncomes: totalIncomes.toNumber(),
      balance: totalIncomes.minus(totalExpenses).toNumber(),
      expensesByCategory: Array.from(groupedExpenses.values())
        .map((entry) => ({
          categoryId: entry.categoryId,
          categoryName: entry.categoryName,
          categoryColor: entry.categoryColor,
          amount: entry.amount.toNumber(),
          percentage: totalExpenses.isZero()
            ? 0
            : entry.amount
                .div(totalExpenses)
                .mul(100)
                .toDecimalPlaces(2)
                .toNumber(),
        }))
        .sort((a, b) => b.amount - a.amount),
    };

    reply.send(summary);
  } catch (err) {
    request.log.error({ err }, 'Erro ao trazer transações');
    reply.status(500).send({ error: 'Erro do servidor' });
  }
};
