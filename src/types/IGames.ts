export interface IGameGenre {
  id: number;
  name: string;
}

export interface IGame {
  id: number;
  name: string;
  genres: [number];
  screenshots: [
    {
      id: number;
      image_id: string;
    }
  ];
}
