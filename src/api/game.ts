import axios from 'axios';
import { IGame } from '../types/IGames';

export const gameFetch = {
  getGame: async (gameId: string | undefined) => {
    const { data } = await axios.get(
      `/.netlify/functions/getGame?gameId=${gameId}`
    );
    return data;
  },

  getPlataform: async (plataformsId: any) => {
    const promises = plataformsId.map( async ({platform_logo}) => await axios.get(`/.netlify/functions/gamePlataform?plataformId=${platform_logo}`))
    const data = (await Promise.all(promises)).map((({data}) => data)).map((data) => data[0]);
    const images = data.map((({image_id}) => image_id));
    return images;
  },

  getCompany: async (game: IGame) => {
    if (game !== undefined && game.involved_companies !== undefined) {
      const companyId = game.involved_companies.find(
        (company) => company.publisher === true
      );
      if (companyId === undefined) {
        return undefined;
      }
      const { data } = await axios.get(
        `/.netlify/functions/gamePublisher?companyId=${companyId?.company}`
      );
      return data[0];
    }
  },
};
