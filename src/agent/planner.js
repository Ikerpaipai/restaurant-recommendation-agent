import { plannerPrompt } from '../prompts/plannerPrompt.js';
import { PlanSchema } from '../schemas/agentSchema.js';
import { askLLM } from '../llm/index.js';

export async function planner(message, history, summary, state) {
  const prompt = plannerPrompt
    .replace('{{state}}', JSON.stringify(state, null, 2))
    .replace('{{summary}}', JSON.stringify(summary, null, 2))
    .replace('{{history}}', JSON.stringify(history, null, 2))
    .replace('{{message}}', message);

  const text = await askLLM({
    type: 'planner',
    prompt,
    context: {
      message,
      history,
      state,
      summary,
    },
  });

  const plan = JSON.parse(text);

  console.log('PLAN GENERE :', JSON.stringify(plan, null, 2));

  return PlanSchema.parse(plan);
}
