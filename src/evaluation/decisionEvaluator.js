export function evaluateDecision(decision, expectedDecision) {
  const errors = [];

  if (!decision.selectedRestaurants) {
    errors.push({
      field: 'selectedRestaurants',
      message: 'Liste absente',
    });

    return {
      success: false,
      errors,
    };
  }

  if (expectedDecision && decision.selectedRestaurants.length < expectedDecision.minResults) {
    errors.push({
      field: 'selectedRestaurants',
      message: 'Pas assez de restaurants retournés',
    });
  }

  for (const restaurant of decision.selectedRestaurants) {
    if (!restaurant.name) {
      errors.push({
        field: 'name',
        message: 'Nom restaurant absent',
      });
    }

    if (typeof restaurant.score !== 'number') {
      errors.push({
        field: 'score',
        message: 'Score invalide',
      });
    }
  }

  return {
    success: errors.length === 0,
    errors,
  };
}
