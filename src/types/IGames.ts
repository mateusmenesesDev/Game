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
  videos: [{ id: number; video_id: string }];
  rating: number;
  created_at: number;
  first_release_date: number;
  involved_companies: [object: any];
  platforms: [object: any];
  similar_games: [object: any];
  summary: [string];
}

export interface IBasicImageGameApi {
  id: number;
  image_id: string;
}
