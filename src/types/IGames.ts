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
  involved_companies: [
    { id: number; developer: boolean; publisher: boolean; company: number }
  ];
  platforms: [{ id: number; platform_logo: number }];
  similar_games: [{ id: number; cover: { id: number; image_id: string } }];
  summary: [string];
}

export interface IBasicMediaGameApi {
  id: number;
  image_id?: string;
  video_id?: string;
}

export interface IDetaiGame {
  game: IGame;
  company?: IBasicGameApi;
}

export interface IUserList extends IDetaiGame{
  rating: number;
  type: string
}