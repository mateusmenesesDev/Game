import axios from 'axios';
import { IBasicMediaGameApi, IGame } from '../types/IGames';

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
  getPlataformsLogos: async (game: IGame) => {
    if (game !== undefined && game.platforms !== undefined) {
      const logoIds = game.platforms.map(({ platform_logo }) => platform_logo);
      const logos: IBasicMediaGameApi[] = await Promise.all(
        logoIds.map(async (id) => {
          const { data } = await axios.get(
            `/.netlify/functions/gamePlataform?logoId=${id}`
          );
          return data;
        })
      );
      return logos;
    }
  },
};
