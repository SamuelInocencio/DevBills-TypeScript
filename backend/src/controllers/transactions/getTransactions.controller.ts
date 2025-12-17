import type { FastifyReply, FastifyRequest } from 'fastify';
import type { GetTransactionQuery } from '../../schemas/transaction.schema';
import { TransactionFilter } from '../../types/transaction.schema';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import prisma from '../../config/prisma';

dayjs.extend(utc);

export const getTransactions = async (
    request: FastifyRequest<{ Querystring: GetTransactionQuery }>,
    reply: FastifyReply,
): Promise<void> => {
    const userId = "sadjfklasjlksadjklfsajd";

    if (!userId) {
        reply.status(401).send({ error: "Usuário não autenticado" });
        return;
    }

    const { month, year, type, categoryId } = request.query;

    const filters: TransactionFilter = { userId };

    if (month && year) {
        const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
        const endDate = dayjs.utc(startDate).endOf("month").toDate();
        filters.date = { gte: startDate, lte: endDate };
    }

    if(type) {
        filters.type = type;
    }

    if (categoryId) {
        filters.categoryId = categoryId;
    }

    try {
        const transactons = await prisma.transaction.findMany({
            where: filters,
            orderBy: {date: "desc"},
            include: {
                category: {
                    select: {
                        color: true,
                        name: true,
                        type: true
                    }
                }
            }
        })

        reply.send(transactons);
    } catch (err) {
        request.log.error("Erro ao trazer transações", err);
        reply.status(500).send({ error: "Erro do servidor"})
    }
};
