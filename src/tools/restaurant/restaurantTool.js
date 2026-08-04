import { searchRestaurantAPI } from './restaurantApi.js';
import { mockRestaurants } from './restaurantMock.js';
import { filterRestaurants } from './restaurantFilter.js';

export async function searchRestaurant(filters) {
  try {
    console.log('recuperation du filters dans search restaurant:', filters);

    const restaurants = await searchRestaurantAPI(filters);

    const filtered = filterRestaurants(restaurants, filters);

    if (filtered.length > 0) {
      return filtered;
    }

    throw new Error('API returned no restaurant');
  } catch (error) {
    console.log('Restaurant API indisponible :', error.message);

    return filterRestaurants(mockRestaurants, filters);
  }
}
