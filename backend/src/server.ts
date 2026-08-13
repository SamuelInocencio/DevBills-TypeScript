import app from './app';
import { env } from './config/env';
import initializeFirebaseAdmin from './config/firebase';
import { prismaConnect } from './config/prisma';
import { initializeGlobalCategories } from './services/globalCategories.service';

const PORT = env.PORT;

initializeFirebaseAdmin();

const startServer = async () => {
  try {
    await prismaConnect();

    await initializeGlobalCategories();

    // host 0.0.0.0: o padrão do Fastify é 127.0.0.1, que dentro de um
    // container só aceita conexões do próprio container.
    await app.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.error('❌ Falha ao iniciar o servidor:', err);
    process.exit(1);
  }
};

startServer();
