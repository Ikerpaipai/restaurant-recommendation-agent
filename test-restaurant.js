import { searchRestaurant } from './src/services/restaurant.js';

const restaurants = await searchRestaurant('Paris');

console.log(JSON.stringify(restaurants, null, 2));
