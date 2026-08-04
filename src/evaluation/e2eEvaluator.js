export function evaluateE2E(result, expected) {
  const errors = [];

  const restaurants = result.answer?.restaurants;

  if (!restaurants) {
    errors.push({
      field: 'answer',
      message: 'Aucun restaurant retourné',
    });

    return {
      success: false,
      errors,
    };
  }

  if (restaurants.length < expected.minRestaurants) {
    errors.push({
      field: 'restaurants',
      message: 'Nombre insuffisant',
    });
  }

  return {
    success: errors.length === 0,
    errors,
  };
}
