export interface IGameGenre {
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
}
