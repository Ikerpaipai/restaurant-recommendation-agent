export function createTrace(message) {
  return {
    id: crypto.randomUUID(),

    startTime: Date.now(),

    input: {
      message,
    },

    state: null,

    plan: null,

    tools: [],

    decision: null,

    output: null,
  };
}
