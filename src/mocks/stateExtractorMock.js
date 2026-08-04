export async function stateExtractorMock(message) {
  console.log('STATE EXTRACTOR MOCK utilisé');

  if (message.toLowerCase().includes('hendaye')) {
    return {
      intent: 'search_restaurant',
      city: 'Hendaye',
      cuisine: null,
      budget: null,
      preferences: [],
    };
  }

  if (message.toLowerCase().includes('asiatique')) {
    return {
      intent: 'search_restaurant',
      city: 'Paris',
      cuisine: 'asiatique',
      budget: null,
      preferences: [],
    };
  }

  return {
    intent: null,
    city: null,
    cuisine: null,
    budget: null,
    preferences: [],
  };
}
