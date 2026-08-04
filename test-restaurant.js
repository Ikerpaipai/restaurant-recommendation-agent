import { searchRestaurant } from './src/tools/restaurant.js';

const restaurants = await searchRestaurant('Paris');

console.log(JSON.stringify(restaurants, null, 2));
