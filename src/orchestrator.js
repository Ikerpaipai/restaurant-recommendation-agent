import { plannerMock } from './mocks/plannerMock.js';
import { decisionMock } from './mocks/decisionMock.js';

import { makeDecision } from './agent/decision.js';
import { planner } from './agent/planner.js';
import { executeTool } from './tools/executor.js';
import { formatAnswer } from './agent/formatter.js';
import { createTrace } from './tracing/agentTrace.js';
import { extractState } from './agent/stateExtractor.js';

export async function runAgent(message, history, summary, state) {
  console.log('SUMMARY :', summary);
  console.log('HISTORY :', history);

  const trace = createTrace(message);
  trace.state = state;

  const newState = await extractState(message, history, state);
  trace.state = newState;

  const plan = await planner(message, history, summary, newState);
  // const plan = await plannerMock(message, history);
  trace.plan = plan;

  const observations = [];

  for (const action of plan.actions) {
    try {
      const result = await executeTool(action);

      trace.tools.push({
        tool: action.tool,
        success: true,
        result,
      });

      observations.push({
        tool: action.tool,
        result,
      });
    } catch (error) {
      trace.tools.push({
        tool: action.tool,
        success: false,
        error: error.message,
      });

      observations.push({
        tool: action.tool,
        error: error.message,
      });
    }
  }

  if (observations.length === 0) {
    return {
      answer: 'Impossible de récupérer les informations nécessaires.',
    };
  }

  const decision = await makeDecision(plan.goal, observations, history);
  // const finalAnswer = await decisionMock(plan.goal, observations);
  trace.decision = decision;

  const formatted = await formatAnswer(decision);
  trace.output = formatted;

  trace.duration = Date.now() - trace.startTime;

  console.log('AGENT TRACE', JSON.stringify(trace, null, 2));

  return {
    answer: formatted,
    trace,
  };
}
