export function filterRestaurants(restaurants, filters) {

  return restaurants.filter((restaurant) => {

    return Object.entries(filters).every(
      ([key, value]) => {

        if (!value) return true;

        return String(restaurant[key])
          .toLowerCase()
          .includes(
            String(value).toLowerCase()
          );
      }
    );

  });

}