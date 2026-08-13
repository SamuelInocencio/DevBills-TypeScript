import type { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../../config/prisma';
import type { DeleteTransactionParams } from '../../schemas/transaction.schema';

export const deleteTransaction = async (
  request: FastifyRequest<{ Params: DeleteTransactionParams }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = request.userId;
  const { id } = request.params;

  if (!userId) {
    reply.status(401).send({ error: 'Usuário não autenticado' });
    return;
  }

  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
        userId,
      },
    });

    // 404 cobre os três casos: id inexistente, id de outro usuário e id
    // malformado. Responder igual nos três é proposital — distinguir revelaria
    // quais ids existem. O findFirst acima já filtra por userId.
    if (!transaction) {
      reply.status(404).send({ error: 'Transação não encontrada' });
      return;
    }

    await prisma.transaction.delete({ where: { id } });

    reply.status(200).send({ message: 'Transação deletada com sucesso!' });
  } catch (err) {
    request.log.error({ err }, 'Erro ao deletar transação');
    reply
      .status(500)
      .send({ error: 'Erro interno do servidor, falha ao deletar transação' });
  }
};
