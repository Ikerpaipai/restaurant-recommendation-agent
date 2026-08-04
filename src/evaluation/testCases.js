export const testCases = [
  {
    name: 'Restaurant avec ville',
    message: 'trouve un restaurant à Hendaye',

    expectedState: {
      intent: 'search_restaurant',
      city: 'Hendaye',
    },

    expectedPlan: {
      tool: 'search_restaurant',
      arguments: {
        city: 'Hendaye',
      },
    },

    expectedTool: {
      tool: 'search_restaurant',
      arguments: {
        city: 'Hendaye',
      },
    },

    expectedDecision: {
      minResults: 1,
    },

    expectedFormatter: {
      minRestaurants: 1,
    },

    expectedE2E: {
      minRestaurants: 1,
    },
  },

  {
    name: 'Restaurant asiatique',
    message: 'je veux manger asiatique à Paris',

    expectedState: {
      intent: 'search_restaurant',
      city: 'Paris',
      cuisine: 'asiatique',
    },

    expectedPlan: {
      tool: 'search_restaurant',
      arguments: {
        city: 'Paris',
        cuisine: 'asiatique',
      },
    },

    expectedTool: {
      tool: 'search_restaurant',
      arguments: {
        city: 'Paris',
        cuisine: 'asiatique',
      },
    },

    expectedDecision: {
      minResults: 1,
    },

    expectedFormatter: {
      minRestaurants: 1,
    },

    expectedE2E: {
      minRestaurants: 1,
    },
  },
];
