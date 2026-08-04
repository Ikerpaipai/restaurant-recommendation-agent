import { z } from 'zod';

export const FormatterSchema = z.object({
  restaurants: z.array(
    z.object({
      name: z.string(),
      cuisine: z.string(),
      address: z.string(),
      reason: z.string(),
    })
  ),
});
