import type { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../../config/prisma';
import { createTransactionSchema } from '../../schemas/transaction.schema';

const createTransaction = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const userId = 'FJDLKMsdfSDFG234jk34h2';

  if (!userId) {
    reply.status(401).send({ error: 'Usuário não autenticado' });
    return;
  }

  const result = createTransactionSchema.safeParse(request.body);

  if (!result.success) {
    const errorMessageJSON = result.error.message || 'Validação inválida!';
    console.log(errorMessageJSON);
    const errorMessage = JSON.parse(errorMessageJSON);
    reply.status(400).send({ error: errorMessage[0].message });
    return;
  }

  const transaction = result.data;

  try {
    const category = await prisma.category.findFirst({
      where: {
        id: transaction.categoryId,
        type: transaction.type,
      },
    });

    if (!category) {
      reply.status(400).send({ error: 'Categoria inválida' });
      return;
    }

    const parsedDate = new Date(transaction.date);

    const newTransaction = await prisma.transaction.create({
      data: {
        ...transaction,
        userId,
        date: parsedDate,
      },
      include: {
        category: true,
      },
    });

    reply.status(201).send(newTransaction);
  } catch (err) {
    request.log.error('Erro ao criar transação', err);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};

export default createTransaction;
