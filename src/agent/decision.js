import { decisionPrompt } from '../prompts/decisionPrompt.js';
import { DecisionSchema } from '../schemas/decisionSchema.js';
import { askLLM } from '../llm/index.js';

export async function makeDecision(goal, observations, history) {
  const prompt = decisionPrompt
    .replace('{{history}}', JSON.stringify(history, null, 2))
    .replace('{{goal}}', goal)
    .replace('{{observations}}', JSON.stringify(observations, null, 2));

  const text = await askLLM({
    type: 'decision',
    prompt,
    context: {
      goal,
      observations,
    },
  });

  const decision = JSON.parse(text);

  return DecisionSchema.parse(decision);
}
