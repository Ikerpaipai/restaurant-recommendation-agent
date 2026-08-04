import { geocodeCity } from "../geocoding.js";

export async function searchRestaurantAPI({ city }) {
  console.log('recuperation de city:', city);

  if(process.env.AI_MODE === "mock"){
    throw new Error("API disabled in mock mode");
  }
  
  if (!city) {
    throw new Error('Ville obligatoire pour rechercher un restaurant');
  }
  const coordinates = await geocodeCity(city);

  const query = `
      [out:json][timeout:10];
  
      (
        node["amenity"="restaurant"]
        (around:3000,${coordinates.latitude},${coordinates.longitude});
  
        way["amenity"="restaurant"]
        (around:3000,${coordinates.latitude},${coordinates.longitude});
      );
  
      out center 10;
    `;

  const response = await fetch('https://overpass.kumi.systems/api/interpreter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: new URLSearchParams({
      data: query,
    }),
  });

  if (!response.ok) {
    throw new Error(`Overpass error: ${response.status}`);
  }

  const data = await response.json();

  return data.elements.map((place) => ({
    name: place.tags?.name ?? 'Restaurant sans nom',
    cuisine: place.tags?.cuisine ?? 'Non précisée',
    address: [place.tags?.['addr:housenumber'], place.tags?.['addr:street'], place.tags?.['addr:city']]
      .filter(Boolean)
      .join(' '),
  }));
}
