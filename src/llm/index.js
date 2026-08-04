import { askGemini } from './gemini.js';
import { plannerMock } from '../mocks/plannerMock.js';
import { decisionMock } from '../mocks/decisionMock.js';
import { stateExtractorMock } from '../mocks/stateExtractorMock.js';
import { formatterMock } from '../mocks/formatterMock.js';

export async function askLLM({ type, prompt, context }) {
  if (process.env.AI_MODE === 'mock') {
    console.log(`🤖 Provider MOCK : ${type}`);

    switch (type) {
      case 'planner':
        return JSON.stringify(await plannerMock(context.message, context.history, context.state, context.summary));

      case 'decision':
        return JSON.stringify(await decisionMock(context.goal, context.observations));

      case 'state':
        return JSON.stringify(await stateExtractorMock(context.message, context.summary, context.state));

      case 'formatter':
        return JSON.stringify(await formatterMock(context.data));

      default:
        console.log(`Aucun mock pour ${type}, utilisation Gemini`);

        return askGemini(prompt);
    }
  }

  console.log('🤖 Provider GEMINI');

  return askGemini(prompt, JSON.stringify(context));
}
