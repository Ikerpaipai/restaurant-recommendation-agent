export function evaluateState(state, expected) {
  const errors = [];

  for (const key of Object.keys(expected)) {
    if (state[key] !== expected[key]) {
      errors.push({
        field: key,
        expected: expected[key],
        received: state[key],
      });
    }
  }

  return {
    success: errors.length === 0,
    errors,
  };
}
