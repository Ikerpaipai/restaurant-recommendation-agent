export function evaluateTool(actions, expectedTool) {
  const errors = [];

  const action = actions[0];

  if (!action) {
    return {
      success: false,
      errors: [
        {
          field: 'tool',
          expected: expectedTool.tool,
          received: undefined,
        },
      ],
    };
  }

  if (action.tool !== expectedTool.tool) {
    errors.push({
      field: 'tool',
      expected: expectedTool.tool,
      received: action.tool,
    });
  }

  for (const key of Object.keys(expectedTool.arguments)) {
    if (action.arguments[key] !== expectedTool.arguments[key]) {
      errors.push({
        field: `arguments.${key}`,
        expected: expectedTool.arguments[key],
        received: action.arguments[key],
      });
    }
  }

  return {
    success: errors.length === 0,
    errors,
  };
}

export function evaluateToolExecution(observations, expectedTool) {
  const errors = [];

  const observation = observations.find((obs) => obs.tool === expectedTool.tool);

  if (!observation) {
    return {
      success: false,
      errors: [
        {
          field: 'tool',
          expected: expectedTool.tool,
          received: undefined,
        },
      ],
    };
  }

  if (!Array.isArray(observation.result)) {
    errors.push({
      field: 'result',
      expected: 'array',
      received: typeof observation.result,
    });
  }

  return {
    success: errors.length === 0,
    errors,
  };
}
