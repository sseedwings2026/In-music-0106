
import { GoogleGenAI, Type } from "@google/genai";
import { Song } from "../types";

export const fetchMusicRecommendations = async (theme: string): Promise<Song[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Recommend exactly 7 songs for a subway or bus commute based on this theme/genre: "${theme}". 
    The recommendations should focus on "World Music" (Global Music) from diverse countries.
    Constraint 1: Include a mix of songs from various countries (e.g., USA, UK, Japan, France, Brazil, etc.).
    Constraint 2: Ensure that 2-3 of the songs are Korean (K-Pop, K-Indie, etc.).
    Constraint 3: For each song, provide the specific country of origin and explain briefly why it's good for a commute in Korean.`,
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
                country: { type: Type.STRING, description: "The country of origin (e.g., '대한민국', '미국', '일본', '프랑스')" },
                isKorean: { type: Type.BOOLEAN }
              },
              required: ["title", "artist", "reason", "country", "isKorean"]
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
