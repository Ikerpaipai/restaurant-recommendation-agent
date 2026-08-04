import { formatterPrompt } from '../prompts/formatterPrompt.js';
import { FormatterSchema } from '../schemas/formatterSchema.js';
import { askLLM } from '../llm/index.js';

export async function formatAnswer(data) {
  console.log('DATA POUR FORMATTER :', data);
  
  const prompt = `
    ${formatterPrompt}

    Données à formater :

    ${JSON.stringify(data)}
  `;

  const text = await askLLM({
    type: 'formatter',
    prompt,
    context: {
      data,
    },
  });

  const answer = JSON.parse(text);

  return FormatterSchema.parse(answer);
}
