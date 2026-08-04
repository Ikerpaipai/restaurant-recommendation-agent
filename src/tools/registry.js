import { getWeather } from './weather.js';
import { searchRestaurant } from './restaurant/restaurantTool.js';

export const toolRegistry = {
  get_weather: getWeather,
  search_restaurant: searchRestaurant,
};
