
export interface Song {
  title: string;
  artist: string;
  reason: string;
  country: string;
  isKorean: boolean;
}

export interface RecommendationResponse {
  songs: Song[];
}
