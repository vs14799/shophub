
import { GoogleGenAI } from "@google/genai";
import { Role } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIAssistance = async (role: Role, query: string) => {
  const systemInstructions: Record<Role, string> = {
    [Role.CUSTOMER]: "You are a shopping assistant helping users find products and deals.",
    [Role.ADMIN]: "You are a technical advisor helping administrators monitor system health and security."
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: systemInstructions[role],
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm having trouble processing your request right now.";
  }
};
