import { testCases } from './testCases.js';
import { runAgent } from '../orchestrator.js';

import { evaluateState } from './evaluator.js';
import { evaluatePlan } from './planEvaluator.js';
import { evaluateTool, evaluateToolExecution } from './toolEvaluator.js';
import { evaluateDecision } from './decisionEvaluator.js';
import { evaluateFormatter } from './formatterEvaluator.js';
import { evaluateE2E } from './e2eEvaluator.js';

for (const test of testCases) {
  console.log('\n=================');
  console.log('TEST:', test.name);

  const result = await runAgent(
    test.message,
    [],
    {},
    {
      intent: null,
      city: null,
      cuisine: null,
      budget: null,
      preferences: [],
    }
  );

  console.log('FINAL RESULT:', JSON.stringify(result, null, 2));

  const e2eResult = evaluateE2E(result, test.expectedE2E);
  console.log('E2E:', e2eResult);
}
