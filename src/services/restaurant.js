export async function searchRestaurant(city) {
  const query = `
    [out:json];
    area["name"="${city}"]->.searchArea;

    (
      node["amenity"="restaurant"](area.searchArea);
      way["amenity"="restaurant"](area.searchArea);
      relation["amenity"="restaurant"](area.searchArea);
    );

    out center 20;
    `;

  const response = await fetch('https://overpass.kumi.systems/api/interpreter', {
    method: 'POST',
    headers: {
      'User-Agent': 'chatbot-forecast-training/1.0 (contact: ton-email@example.com)',
    },
    body: new URLSearchParams({
      data: query,
    }),
  });

  const data = await response.json();

  const restaurants = data.elements.map((place) => ({
    name: place.tags?.name || 'Restaurant sans nom',
    cuisine: place.tags?.cuisine || 'Cuisine non précisée',
    address:
      [place.tags?.['addr:housenumber'], place.tags?.['addr:street'], place.tags?.['addr:city']]
        .filter(Boolean)
        .join(' ') || 'Adresse inconnue',
    features: {
      outdoor: place.tags?.outdoor_seating === 'yes',
      indoor: place.tags?.outdoor_seating === 'yes',
    },
    contact: {
      phone: place.tags?.phone || null,
      website: place.tags?.website || null,
    },
  }));

  return restaurants;
}
