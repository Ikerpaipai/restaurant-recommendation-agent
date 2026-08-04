import { summaryPrompt } from '../prompts/summaryPrompt.js';
import { askLLM } from '../llm/index.js';

export async function summarize(history) {
  const prompt = summaryPrompt.replace('{{history}}', JSON.stringify(history, null, 2));

  const text = await askLLM({
    type: 'summary',
    prompt,
    context: {
      history,
    },
  });

  const cleanText = text
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();

  const summary = JSON.parse(cleanText);

  return summary;
}
