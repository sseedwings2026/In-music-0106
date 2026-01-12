
import { GoogleGenAI, Type } from "@google/genai";
import { Song } from "../types";

export const fetchMusicRecommendations = async (theme: string): Promise<Song[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Recommend exactly 7 songs for a subway or bus commute based on this theme/genre: "${theme}". 
    Constraint 1: 5 songs must be Korean songs (K-Pop, K-Indie, K-OST, etc.).
    Constraint 2: 2 songs must be International songs.
    Constraint 3: For each song, explain briefly why it's good for a commute in Korean.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          songs: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                artist: { type: Type.STRING },
                reason: { type: Type.STRING },
                isKorean: { type: Type.BOOLEAN }
              },
              required: ["title", "artist", "reason", "isKorean"]
            }
          }
        },
        required: ["songs"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text || "{}");
    return data.songs || [];
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("음악 정보를 불러오는 데 실패했습니다.");
  }
};
