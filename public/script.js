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

  // afficher réponse IA
  messages.innerHTML += `
        <p class="mb-2">
            <span class="bg-gray-200 px-3 py-1 rounded">
                ${data.answer}
            </span>
        </p>
    `;
});
