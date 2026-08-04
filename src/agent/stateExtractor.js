import { statePrompt } from '../prompts/statePrompt.js';
import { StateSchema } from '../schemas/stateSchema.js';
import { askLLM } from '../llm/index.js';

export async function extractState(message, summary, oldState) {
  const prompt = statePrompt
    .replace('{{message}}', message)
    .replace('{{summary}}', JSON.stringify(summary, null, 2))
    .replace('{{state}}', JSON.stringify(oldState, null, 2));

  try {
    const text = await askLLM({
      type: 'state',
      prompt,
      context: {
        message,
        summary,
        state: oldState,
      },
    });

    const extractedState = JSON.parse(text);

    return StateSchema.parse(extractedState);
  } catch (error) {
    console.log('ERREUR STATE EXTRACTOR :', error.message);

    return oldState;
  }
}
