export function evaluateFormatter(output, expectedFormatter) {
  const errors = [];

  if (!output) {
    return {
      success: false,
      errors: [
        {
          field: 'output',
          message: 'Réponse absente',
        },
      ],
    };
  }

  if (!output.message) {
    errors.push({
      field: 'message',
      message: 'Message absent',
    });
  }

  if (!Array.isArray(output.restaurants)) {
    errors.push({
      field: 'restaurants',
      message: 'Restaurants absents ou mauvais format',
    });

    return {
      success: false,
      errors,
    };
  }

  if (expectedFormatter?.minRestaurants && output.restaurants.length < expectedFormatter.minRestaurants) {
    errors.push({
      field: 'restaurants',
      message: 'Pas assez de restaurants',
    });
  }

  for (const restaurant of output.restaurants) {
    if (!restaurant.name) {
      errors.push({
        field: 'restaurant.name',
        message: 'Nom restaurant absent',
      });
    }
  }

  return {
    success: errors.length === 0,
    errors,
  };
}
