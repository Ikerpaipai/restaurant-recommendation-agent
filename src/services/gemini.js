import { GoogleGenAI } from '@google/genai';

import { getWeather } from './weather.js';
import { searchRestaurant } from './restaurant.js';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const tools = [
  {
    type: 'function',
    name: 'get_weather',
    description:
      "Retourne la météo actuelle d'une ville donnée. Utilise cet outil pour toute question concernant la météo ou la température.",
    parameters: {
      type: 'object',
      properties: {
        city: {
          type: 'string',
          description: 'Nom de la ville',
        },
      },
      required: ['city'],
    },
  },
  {
    type: 'function',
    name: 'search_restaurant',
    description:
      'Trouve des restaurants dans une ville. Utilise cet outil uniquement après avoir obtenu les informations météo nécessaires pour adapter la recommandation.',
    parameters: {
      type: 'object',
      properties: {
        city: {
          type: 'string',
          description: 'Ville où chercher les restaurants',
        },
      },
      required: ['city'],
    },
  },
];

export async function askGemini(message) {
  let interaction = await ai.interactions.create({
    model: 'gemini-3.5-flash',
    input: message,
    system_instruction: `
            Tu es un agent qui recommande des restaurants.

            Pour une demande de restaurant :
            1. Obtiens la météo.
            2. Analyse la météo.
            3. Recherche les restaurants.
            4. Choisis les restaurants adaptés.

            Règles :
            - pluie → privilégier indoor
            - beau temps → privilégier outdoor
            - froid mais beau → privilégier outdoor adapté

            Réponds en français simplement.
            
            Format de réponse :
            - Commence directement par une courte phrase de contexte (maximum 1 phrase).
            - Saute une ligne avant la liste des restaurants.
            - Présente les restaurants sous forme de liste numérotée.
            - Pour chaque restaurant indique uniquement : nom, cuisine, adresse et raison du choix.
            - N'utilise pas de longs paragraphes.
            - N'ajoute pas de conclusion inutile.
        `,
    tools,
  });

  while (true) {
    const toolCalls = interaction.steps.filter((step) => step.type === 'function_call');

    if (toolCalls.length === 0) {
      break;
    }

    const results = [];

    for (const toolCall of toolCalls) {
      if (toolCall.name === 'get_weather') {
        const city = toolCall.arguments.city;
        const weather = await getWeather(city);
        console.log('Météo :', weather);

        results.push({
          type: 'function_result',
          name: toolCall.name,
          call_id: toolCall.id,
          result: [
            {
              type: 'text',
              text: JSON.stringify(weather),
            },
          ],
        });
      }

      if (toolCall.name === 'search_restaurant') {
        const city = toolCall.arguments.city;
        const restaurants = await searchRestaurant(city);

        console.log('Restaurants :', restaurants);

        results.push({
          type: 'function_result',
          name: toolCall.name,
          call_id: toolCall.id,
          result: [
            {
              type: 'text',
              text: JSON.stringify(restaurants),
            },
          ],
        });
      }
    }

    interaction = await ai.interactions.create({
      model: 'gemini-3.5-flash',
      previous_interaction_id: interaction.id,
      input: results,
      tools,
    });
  }

  return {
    type: 'text',
    answer: interaction.output_text,
  };
}
