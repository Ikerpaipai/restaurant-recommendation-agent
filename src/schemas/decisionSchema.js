import { z } from 'zod';

export const DecisionSchema = z.object({
  selectedRestaurants: z
    .array(
      z.object({
        name: z.string(),
        cuisine: z.string().optional(),
        address: z.string().optional(),
        score: z.number(),
        reason: z.string(),
      })
    )
    .max(3),
});
