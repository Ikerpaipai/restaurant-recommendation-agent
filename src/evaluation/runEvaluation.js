import { testCases } from './testCases.js';
import { evaluateState } from './evaluator.js';
import { evaluatePlan } from './planEvaluator.js';
import { plannerMock } from '../mocks/plannerMock.js';
import { extractState } from '../agent/stateExtractor.js';
import { evaluateTool, evaluateToolExecution } from './toolEvaluator.js';
import { executeTool } from '../tools/executor.js';
import { decisionMock } from '../mocks/decisionMock.js';
import { evaluateDecision } from './decisionEvaluator.js';
import { formatterMock } from '../mocks/formatterMock.js';
import { evaluateFormatter } from './formatterEvaluator.js';

for (const test of testCases) {
  console.log('\n=================');
  console.log('TEST:', test.name);

  const state = await extractState(test.message, {}, {});

  const stateResult = evaluateState(state, test.expectedState);
  console.log('STATE:', stateResult);

  const plan = await plannerMock(test.message, [], state);

  const planResult = evaluatePlan(plan, test.expectedPlan);
  console.log('PLAN:', planResult);

  const toolResult = evaluateTool(plan.actions, test.expectedTool);
  console.log('TOOL:', toolResult);

  const observations = [];

  for (const action of plan.actions) {
    const result = await executeTool(action);

    observations.push({
      tool: action.tool,
      result,
    });
  }

  const toolExecutionResult = evaluateToolExecution(observations, test.expectedTool);
  console.log('TOOL EXECUTION:', toolExecutionResult);

  console.log('OBSERVATIONS:', JSON.stringify(observations, null, 2));

  const decision = await decisionMock(plan.goal, observations);
  console.log('DECISION:', JSON.stringify(decision, null, 2));

  const decisionResult = evaluateDecision(decision, test.expectedDecision);
  console.log('DECISION:', decisionResult);

  const formatted = await formatterMock(decision);
  console.log('FORMATTER OUTPUT:', JSON.stringify(formatted, null, 2));

  const formatterResult = evaluateFormatter(formatted, test.expectedFormatter);
  console.log('FORMATTER:', formatterResult);
}
