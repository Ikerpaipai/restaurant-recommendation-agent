import { z } from 'zod';

export const StateSchema = z.object({
  intent: z.string().nullable(),
  city: z.string().nullable(),
  cuisine: z.string().nullable(),
  budget: z.string().nullable(),
  preferences: z.array(z.string()),
});
