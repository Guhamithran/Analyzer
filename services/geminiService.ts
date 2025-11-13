import { GoogleGenAI } from "@google/genai";
import { GroundingChunk } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function analyzeContent(url: string, question: string): Promise<{ answer: string; sources?: GroundingChunk[] }> {
  const model = 'gemini-2.5-pro';

  const prompt = `
System Instruction: You are a highly advanced Question Answering AI. Your task is to answer the user's question based on the content of the provided web page URL. Use the Google Search tool to access the content of the URL.

- Base your answer primarily on the information found at the provided URL.
- Provide a detailed, analytical, and explanatory response. Structure your response for clarity and readability.
- If the URL's content does not contain the information required to answer the question, you must explicitly state: "The content of the provided URL does not contain the information required to answer this question."
- Do not invent, infer, or speculate on information not present in the content of the URL.

URL: ${url}

Question: ${question}
`;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            tools: [{googleSearch: {}}],
        }
    });
    
    const answer = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] | undefined;

    return { answer, sources };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get a response from the AI model: ${error.message}`);
    }
    throw new Error("Failed to get a response from the AI model due to an unknown error.");
  }
}
