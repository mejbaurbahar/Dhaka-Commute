
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BUS_DATA } from '../constants';

export const askGeminiRoute = async (userQuery: string, userApiKey?: string): Promise<string> => {
  // Check if user has their own API key saved in settings
  const savedUserApiKey = localStorage.getItem('gemini_api_key');
  const hasValidSavedKey = savedUserApiKey && savedUserApiKey.trim().length > 20;

  // Check if API key was passed as parameter
  const hasValidParamKey = userApiKey && userApiKey.trim().length > 20;

  let apiKey: string = '';

  // Use user's personal API key
  if (hasValidSavedKey) {
    apiKey = savedUserApiKey as string;
    console.log('✅ Using saved user API key from settings');
  } else if (hasValidParamKey) {
    apiKey = userApiKey as string;
    console.log('✅ Using user API key from parameter');
  } else {
    // No API key provided - user must add one
    console.log('❌ No API key found');
    return `🔑 API Key Required\n\nPlease add your Gemini API key in Settings to use the AI Assistant.\n\n📍 How to get your API key:\n1. Visit https://aistudio.google.com/apikey\n2. Create a new API key\n3. Copy it and paste in Settings\n\n💡 It's free and takes less than a minute!`;
  }

  try {
    // Initialize standard Gemini SDK
    const genAI = new GoogleGenerativeAI(apiKey);

    // Construct a context-aware prompt with our bus data
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

    // Use the official model initialization
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
      systemInstruction: systemInstruction
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userQuery }] }],
      generationConfig: {
        temperature: 0.4,
        topK: 20,
        topP: 0.9,
        maxOutputTokens: 512,
      },
    });

    const response = await result.response;
    const text = response.text();

    return text || "Sorry, I couldn't process that request right now.";

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.status,
      response: error.response
    });

    // Provide more helpful error messages
    if (error.message?.includes('API key')) {
      return "❌ Invalid API Key\n\nYour API key appears to be invalid. Please check:\n\n1. Make sure you copied the complete API key\n2. Verify it's a valid Gemini API key from https://aistudio.google.com/apikey\n3. Try generating a new key if needed\n\nThen update it in Settings.";
    }

    if (error.message?.includes('quota') || error.message?.includes('limit')) {
      return "⚠️ API Quota Exceeded\n\nYou've reached the limit for your Gemini API key.\n\nPlease check your usage at https://aistudio.google.com/apikey or wait for your quota to reset.";
    }

    return `❌ Error: ${error.message || 'Failed to connect to AI assistant'}\n\nPlease try again or check your API key in Settings.`;
  }
};
