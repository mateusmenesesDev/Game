/* eslint-disable @typescript-eslint/no-empty-function */
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { firestore } from '../services/firebase/firestore';
import { IBasicGameApi, IGame, IUserList } from '../types/IGames';
import { useAuth } from './Auth';

type Props = {
  children: React.ReactNode;
};
type InitialContextProps = {
  games: IGame[];
  setGames: React.Dispatch<React.SetStateAction<IGame[]>>;
  genres: IBasicGameApi[];
  setGenres: React.Dispatch<React.SetStateAction<IBasicGameApi[]>>;
  userList: IUserList[];
  setUserList: React.Dispatch<React.SetStateAction<IUserList[] | []>>;
};

const initialContext = {
  games: [],
  setGames: () => {},
  genres: [],
  setGenres: () => {},
  userList: [],
  setUserList: () => {},
};

export const Context = createContext<InitialContextProps>(initialContext);

export const ContextProvider = ({ children }: Props) => {
  const { user } = useAuth();
  const [games, setGames] = useState<IGame[]>([]);
  const [genres, setGenres] = useState<IBasicGameApi[]>([]);
  const [userList, setUserList] = useState<IUserList[] | []>([]);
  async function getGamesAndGenres() {
    const { data } = await axios.get('/.netlify/functions/gameApi');
    setGames(data.games);
    setGenres(data.genres);
  }

  useEffect(() => {
    getGamesAndGenres();
  }, []);

  useEffect(() => {
    console.log('PEGOU DO FIREBASE');
    if (user) firestore.getGameListFirestore({ user, setUserList });
  }, [user]);
  return (
    <Context.Provider
      value={{
        games,
        setGames,
        genres,
        setGenres,
        userList,
        setUserList,
      }}
    >
      {children}
    </Context.Provider>
  );
};
