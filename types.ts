
export interface Song {
  title: string;
  artist: string;
  reason: string;
  isKorean: boolean;
}

export interface RecommendationResponse {
  songs: Song[];
}
