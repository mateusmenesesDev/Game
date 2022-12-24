/* eslint-disable @typescript-eslint/no-empty-function */
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { IBasicGameApi, IGame } from '../types/IGames';

type Props = {
  children: React.ReactNode;
};
type InitialContextProps = {
  games: IGame[];
  setGames: React.Dispatch<React.SetStateAction<IGame[]>>;
  genres: IBasicGameApi[];
  setGenres: React.Dispatch<React.SetStateAction<IBasicGameApi[]>>;
};

const initialContext = {
  games: [],
  setGames: () => {},
  genres: [],
  setGenres: () => {},
};

export const Context = createContext<InitialContextProps>(initialContext);

export const ContextProvider = ({ children }: Props) => {
  const [games, setGames] = useState<IGame[]>([]);
  const [genres, setGenres] = useState<IBasicGameApi[]>([]);

  async function getGamesAndGenres() {
    const { data } = await axios.get('/.netlify/functions/gameApi');
    setGames(data.games);
    setGenres(data.genres);
  }
  useEffect(() => {
    getGamesAndGenres();
  }, []);

  return (
    <Context.Provider value={{ games, setGames, genres, setGenres }}>
      {children}
    </Context.Provider>
  );
};
