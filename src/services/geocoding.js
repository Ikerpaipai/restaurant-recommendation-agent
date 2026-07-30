import axios from 'axios';

export async function getCoordinates(city) {
  const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
    params: {
      name: city,
      count: 1,
      language: 'fr',
      format: 'json',
    },
  });

  if (!response.data.results) {
    throw new Error('Ville introuvable');
  }

  const location = response.data.results[0];

  return {
    latitude: location.latitude,
    longitude: location.longitude,
    name: location.name,
    country: location.country,
  };
}
