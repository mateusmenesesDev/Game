export interface IBasicGameApi {
  id: number;
  name: string;
}

export interface IGame {
  id: number;
  name: string;
  genres: [number];
  cover: { id: number; image_id: string };
  screenshots: [
    {
      id: number;
      image_id: string;
    }
  ];
  rating: number;
  created_at: number;
  first_release_date: number;
  involved_companies: [object: any];
  platforms: [number];
  similar_games: [number];
  summary: [string];
}
