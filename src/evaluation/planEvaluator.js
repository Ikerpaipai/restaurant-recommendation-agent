export function evaluatePlan(plan, expectedPlan) {
  const errors = [];

  const action = plan.actions[0];

  if (action.tool !== expectedPlan.tool) {
    errors.push({
      field: 'tool',
      expected: expectedPlan.tool,
      received: action.tool,
    });
  }

  for (const key of Object.keys(expectedPlan.arguments)) {
    if (action.arguments[key] !== expectedPlan.arguments[key]) {
      errors.push({
        field: `arguments.${key}`,
        expected: expectedPlan.arguments[key],
        received: action.arguments[key],
      });
    }
  }

  return {
    success: errors.length === 0,
    errors,
  };
}
