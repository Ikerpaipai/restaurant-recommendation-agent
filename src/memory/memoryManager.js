import { summarize } from '../agent/summarizer.js';
import { addMessage, getHistory } from './conversation.js';

import { getSummary, updateSummary } from './summary.js';
import { getState, updateState } from '../state/agentState.js';

export function addUserMessage(message) {
  addMessage('user', message);
}

export function addAssistantMessage(message) {
  addMessage('assistant', JSON.stringify(message.answer));
}

export function getMemoryContext() {
  return {
    history: getHistory(),
    summary: getSummary(),
    state: getState(),
  };
}

export function updateAgentState(newState) {
  updateState(newState);
}

export async function refreshSummary() {
  const history = getHistory();
  try {
    const newSummary = await summarize(history);
    updateSummary(newSummary);
  } catch (error) {
    console.log('Summary indisponible :', error.message);
  }
}
