import dotenv from 'dotenv';
import { dot } from 'node:test/reporters';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number).default('3001'),
  DATABASE_URL: z.string().min(5, 'DATABASE_URL é obrigatório'),
  NODE_ENV: z.enum(['dev', 'test', 'prod'], {
    message: 'O Node ENV dev ser dev, test ou prod',
  }),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('🚨 variáveis de ambiente INVÁLIDAS');
  process.exit(1);
}

export const env = _env.data;
