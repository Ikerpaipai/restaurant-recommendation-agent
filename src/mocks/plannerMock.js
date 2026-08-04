export async function plannerMock(message, history, state) {
  console.log('PLANNER MOCK HISTORY :', history);
  console.log('PLANNER MOCK STATE :', state);

  if (state?.cuisine === 'asiatique') {
    return {
      goal: 'trouver restaurant asiatique',
      actions: [
        {
          tool: 'search_restaurant',
          arguments: {
            city: state.city,
            cuisine: state.cuisine,
          },
        },
      ],
    };
  }

  return {
    goal: 'trouver restaurant',
    actions: [
      {
        tool: 'search_restaurant',
        arguments: {
          city: state.city,
        },
      },
    ],
  };
}
