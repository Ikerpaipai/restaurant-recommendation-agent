export async function formatterMock(data) {
  console.log('FORMATTER MOCK utilisé');

  return {
    message: `Voici les restaurants que j'ai trouvés : ${data.selectedRestaurants.map((r) => r.name).join(', ')}`,

    restaurants: data.selectedRestaurants,
  };
}
