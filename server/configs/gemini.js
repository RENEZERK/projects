import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    input: prompt,
  });

  // SDKs typically expose `response.text()`; keep a safe fallback.
  return typeof response.text === "function" ? response.text() : response.text;
}