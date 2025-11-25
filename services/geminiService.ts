import { GoogleGenAI } from '@google/genai';
import { BUS_DATA } from '../constants';

export const askGeminiRoute = async (userQuery: string): Promise<string> => {
  // Use environment variable exclusively as per guidelines
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("API Key not found");
    return "The AI service is currently unavailable. Please check the system configuration.";
  }

  try {
    // Initialize client with the key
    const ai = new GoogleGenAI({ apiKey: apiKey });
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
      1. CRITICAL: You must ONLY answer questions related to Dhaka bus routes, transport, commuting, or station locations.
      2. If the user asks about anything unrelated (e.g., politics, coding, math, general knowledge, movies), politely refuse by saying: "I can only help you with Dhaka bus routes and transportation."
      3. Always provide ALL possible options. If there is a direct bus, list it as "Option 1". If there are alternative buses, list them as "Option 2", etc.
      4. If a direct bus is not available, suggest a connecting route (e.g., Take Bus A to Farmgate, then Bus B to Destination).
      5. Be specific about station names.
      6. Use Bengali names in brackets if helpful.
      7. Output format should be clear and structured (e.g., bullet points).
      8. If the user asks in Bengali (Bangla), reply in Bengali.
      9. Be friendly and helpful.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text || "Sorry, I couldn't process that request right now.";

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes('API_KEY_INVALID') || error.status === 400 || error.status === 403) {
      return "The configured API Key is invalid.";
    }
    return "I'm having trouble connecting to the AI assistant. Please check your internet connection.";
  }
};