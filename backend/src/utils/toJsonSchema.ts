import type { z } from 'zod';
import { z as zod } from 'zod';

/**
 * Converte um schema do Zod v4 para JSON Schema no formato que o Fastify aceita.
 *
 * - `io: 'input'` gera o schema do que chega na requisição (antes do parse),
 *   que é o que o Fastify valida.
 * - `unrepresentable: 'any'` evita erro em tipos sem equivalente em JSON,
 *   como o `Date` produzido por `z.coerce.date()`.
 * - O `$schema` é removido porque o Ajv padrão do Fastify não conhece o
 *   dialeto draft 2020-12 emitido pelo Zod e falha ao compilar a rota.
 */
export const toJsonSchema = (schema: z.ZodType): Record<string, unknown> => {
  const { $schema, ...jsonSchema } = zod.toJSONSchema(schema, {
    io: 'input',
    unrepresentable: 'any',
  });

  return jsonSchema;
};
