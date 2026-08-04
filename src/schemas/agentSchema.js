import { z } from 'zod';

export const PlanSchema = z.object({
  goal: z.string(),

  actions: z.array(
    z.object({
      tool: z.string(),
      arguments: z.record(z.any())
    })
  ),
});
