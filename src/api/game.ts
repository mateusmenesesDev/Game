import axios from 'axios';
import { IGame } from '../types/IGames';

export const gameFetch = {
  getGame: async (gameId: string | undefined) => {
    const { data } = await axios.get(
      `/.netlify/functions/getGame?gameId=${gameId}`
    );
    return data[0];
  },
  getCompany: async (game: IGame) => {
    if (game !== undefined && game.involved_companies !== undefined) {
      const companyId = game.involved_companies.find(
        (company) => company.publisher === true
      );
      const { data } = await axios.get(
        `/.netlify/functions/gamePublisher?companyId=${companyId?.company}`
      );
      return data[0];
    }
  },
};
