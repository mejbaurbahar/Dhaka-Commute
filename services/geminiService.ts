import { GoogleGenAI } from '@google/genai';
import { BUS_DATA } from '../constants';

export const askGeminiRoute = async (userQuery: string): Promise<string> => {
  // Exclusively use environment variable as per guidelines
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.warn("Gemini API Key is missing from environment variables.");
    return "The AI Assistant is currently unavailable due to configuration issues.";
  }

  try {
    // Initialize client with the key
    const ai = new GoogleGenAI({ apiKey: apiKey });
    const model = 'gemini-2.5-flash';
    
    // Construct a context-aware prompt with our bus data
    // We stringify the whole object to ensure the AI sees all stops
    const busContext = JSON.stringify(BUS_DATA.map(b => ({
      name: b.name,
      bnName: b.bnName,
      route: b.routeString,
      stops: b.stops // Important: Provide full stop list for connection logic
    })));

    const systemInstruction = `
      You are an expert Dhaka City Transport Assistant. 
      You help users find the best bus for their route based STRICTLY on the provided data.
      
      Here is the COMPLETE database of buses and their stops in JSON format:
      ${busContext}
      
      Context: User is in Dhaka, Bangladesh.
      
      INSTRUCTIONS:
      1. **Exhaustive Search**: When asked for a route (e.g., "Farmgate to Banani"), you MUST check the 'stops' array of EVERY bus in the data.
      2. **Direct Routes**: First, list ALL buses that have BOTH the origin and destination in their 'stops' list.
      3. **Connecting Routes**: If no direct bus exists, find a common stop. 
         - Example: "Take Bus A from Origin to [Common Stop], then take Bus B from [Common Stop] to Destination."
         - You MUST verify that Bus A goes to the common stop and Bus B goes from the common stop.
      4. **Options**: Provide multiple options if available (Option 1, Option 2, etc.).
      5. **Constraints**: 
         - ONLY answer questions about Dhaka buses.
         - Do not invent buses that are not in the list.
         - If the user asks about something unrelated, politely refuse.
      6. **Format**: Use clear bullet points and bold text for bus names.
      7. **Language**: If the user asks in Bengali, reply in Bengali. Otherwise English.
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
    return "I'm having trouble connecting to the AI assistant. Please try again later.";
  }
};