import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getLandmarkFunFact = async (landmarkName: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Tell me a fascinating, short (max 2 sentences) historical or architectural fact about ${landmarkName} in Dhaka, Bangladesh. Keep it engaging.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Fast response needed
      }
    });
    return response.text || "Could not retrieve info.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The guide is currently taking a tea break. Try again later!";
  }
};