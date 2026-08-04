import { createRestaurantCard } from './components/restaurantCard.js';

const input = document.getElementById('inputMessage');
const button = document.getElementById('sendButton');
const messages = document.getElementById('messages');

button.addEventListener('click', async () => {
  const message = input.value;

  if (!message) return;

  // afficher message utilisateur
  messages.innerHTML += `
        <p class="text-right mb-2">
            <span class="bg-blue-500 text-white px-3 py-1 rounded">
                ${message}
            </span>
        </p>
    `;

  input.value = '';

  const response = await fetch('http://localhost:3000/chat', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      message: message,
    }),
  });

  const data = await response.json();
  console.log(data);
  
    if (!response.ok) {

    messages.innerHTML += `
      <div class="bg-red-200 p-4 rounded-lg">
        ${data.answer}
      </div>
    `;

    return;
  }

  // afficher réponse IA
  const restaurants = data.answer.restaurants;


  messages.innerHTML += `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
      ${restaurants.map(createRestaurantCard).join('')}
    </div>
  `;
});
