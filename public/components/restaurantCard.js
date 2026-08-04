export function createRestaurantCard(restaurant) {

  return `
    <div class="bg-gray-200 p-4 rounded-lg">

      ${Object.entries(restaurant)
        .map(([key, value]) => {

          return `
            <p>
              <strong>${key}</strong> :
              ${value}
            </p>
          `;

        })
        .join("")}

    </div>
  `;
}