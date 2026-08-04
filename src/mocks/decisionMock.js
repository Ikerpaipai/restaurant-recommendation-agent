export async function decisionMock(goal, observations) {
  console.log('Decision MOCK utilisé');

  const restaurants = observations[0].result;

  return {
    selectedRestaurants: restaurants.slice(0, 3).map((restaurant, index) => ({
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      address: restaurant.address,
      score: 100 - index * 10,
      reason: 'Adapté à votre demande',
    })),
  };
}
