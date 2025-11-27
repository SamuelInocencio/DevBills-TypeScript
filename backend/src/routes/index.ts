import { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance): Promise<void>{

    fastify.get('/health', async() => {
        return {
            status: 'OK',
            message: 'Servidor DevBills rodando normalmente, Samuel'
        }
    })
}

export default routes