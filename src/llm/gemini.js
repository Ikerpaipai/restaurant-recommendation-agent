import { GoogleGenAI } from '@google/genai';


export async function askGemini(prompt, input) {

  console.log("ASK GEMINI INPUT", input);
  
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const response = await ai.interactions.create({
    model: 'gemini-3.5-flash',
    system_instruction: prompt,
    input,
  });

  return response.output_text;
}
