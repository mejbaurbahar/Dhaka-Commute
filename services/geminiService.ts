
import { GoogleGenAI } from '@google/genai';
import { BUS_DATA } from '../constants';

// Initialize the Gemini client
// Note: process.env.API_KEY is handled by the build system/environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const askGeminiRoute = async (userQuery: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct a context-aware prompt with our bus data
    const busContext = BUS_DATA.map(b => 
      `Bus: ${b.name} (${b.bnName}), Route: ${b.routeString}, Type: ${b.type}`
    ).join('\n');

    const systemInstruction = `
      You are an expert Dhaka City Transport Assistant. 
      You help users find the best bus for their route.
      Here is the available bus data:
      ${busContext}
      
      User Location Context: Dhaka, Bangladesh.
      
      Rules:
      1. CRITICAL: Always provide ALL possible options. If there is a direct bus, list it as "Option 1". If there are alternative buses, list them as "Option 2", etc.
      2. If a direct bus is not available, suggest a connecting route (e.g., Take Bus A to Farmgate, then Bus B to Destination).
      3. Be specific about station names.
      4. Use Bengali names in brackets if helpful.
      5. Output format should be clear and structured (e.g., bullet points).
      6. If the user asks in Bengali (Bangla), reply in Bengali.
      7. Be friendly and helpful.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text || "Sorry, I couldn't process that request right now.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the AI assistant. Please try browsing the list manually.";
  }
};
