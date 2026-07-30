import axios from 'axios';
import { getCoordinates } from './geocoding.js';

export async function getWeather(city) {
  const coordinates = await getCoordinates(city);

  const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
    params: {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      current_weather: true,
    },
  });

  return {
    city: coordinates.name,
    country: coordinates.country,
    weather: response.data.current_weather,
  };
}
