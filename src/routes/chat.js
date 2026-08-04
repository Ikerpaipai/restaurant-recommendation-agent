import { Router } from 'express';
import { runAgent } from '../orchestrator.js';
import { addUserMessage, addAssistantMessage, getMemoryContext, refreshSummary, updateAgentState } from '../memory/memoryManager.js';
import { extractState } from '../agent/stateExtractor.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const message = req.body.message;
    addUserMessage(message);

    const { history, summary, state } = getMemoryContext();

    console.log("OLD STATE :", state);

    const newState = await extractState(message, summary, state);
    updateAgentState(newState);

    const { state: currentState } = getMemoryContext();
    console.log("NEW STATE :", currentState);

    const answer = await runAgent(message, history, summary, currentState);
    addAssistantMessage(answer);
    await refreshSummary();

    res.json({
      answer: answer.answer,
    });
  } catch (error) {
    console.log(error);

    let message = error.message;

    try {
      const parsed = JSON.parse(error.message);

      if (parsed.error?.message) {
        message = parsed.error.message;
      }
    } catch (parseError) {
      console.log("Impossible de parser l'erreur Gemini :", parseError.message);
    }

    res.status(error.status || 500).json({
      answer: message,
    });
  }
});

export default router;
