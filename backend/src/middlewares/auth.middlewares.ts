import type { FastifyReply, FastifyRequest } from 'fastify';
import admin from 'firebase-admin';

declare module 'fastify' {
  interface FastifyRequest {
    userId?: string;
  }
}

export const authMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const authHeader = request.headers.authorization;
  // const authHeader =
  //   'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjRiMTFjYjdhYjVmY2JlNDFlOTQ4MDk0ZTlkZjRjNWI1ZWNhMDAwOWUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU0FNVUVMIEZFUlJFSVJBIElOT0NFTkNJTyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJSXFCMkJVb1JKU1VpdGhGVG1xeW45RDlVYkZDdHhOdTJiNWo2Vlc1MTFLYWViWXdYST1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9kZXZiaWxscy1kMTgyYyIsImF1ZCI6ImRldmJpbGxzLWQxODJjIiwiYXV0aF90aW1lIjoxNzcwNDc5MjY2LCJ1c2VyX2lkIjoiTjBpRXlLN2NmTlFiTHpNMDg2bnpFSGJPWGlDMyIsInN1YiI6Ik4waUV5SzdjZk5RYkx6TTA4Nm56RUhiT1hpQzMiLCJpYXQiOjE3NzA0NzkyNjYsImV4cCI6MTc3MDQ4Mjg2NiwiZW1haWwiOiJzYW11ZWwuaW5vY2VuY2lvQHVmZy5iciIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTE2NTE1MjExODc1NDc1OTY4MDQwIl0sImVtYWlsIjpbInNhbXVlbC5pbm9jZW5jaW9AdWZnLmJyIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.HS5sxwp1Z5dE2bgw_ZBCyd5uSH8w6HDQYc5cGj7zcEPFtqvZOJe5rQHBAs7lN-cj4N0COxHTs7M3RbqOzi3eA-48VPs6vkUbm0-M0BSGH-YIV-9g7hYWNNkY6Uq4u3F-HnArsT7eFAvmutO9BOlq1J21cDBxV0FcJQCLYlgWG31bCJzyVn0HhRuY4YUWPujaTU0fFeVkj1twxqYww3g_nHpwdotWxaY6AMOJ3GbkcVHqMpuXn9hHyD7-wAz7l2ae3uE13oCYt6kLTYgWJBMEs4hcBZv2w3VfladBuOrKVsZp87-ap4ZHOf_QQy85Y8L1KYBRdSCoV6Vy9QRhcNmAow';

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    reply
      .code(401)
      .send({ error: 'Token de autorização não fornecido, caiu aqui. kkk' });
    return;
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('Console.log decodedToken', decodedToken);

    request.userId = decodedToken.uid;
  } catch (err) {
    request.log.error('Erro ao verificar token', err);
    reply.code(401).send({ error: 'Token invalido ou expirado!' });
  }
};
