import axios from 'axios';

async function getAuth() {
  const request = await axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`
  );
  return request.data.access_token;
}

const apiRequest = {
  getAllGames: async () => {
    const fields =
      'fields name, rating, id, genres, screenshots.image_id, created_at, first_release_date, involved_companies.*, platforms.*, similar_games, summary, cover.image_id;';
    const auth = await getAuth();
    const request = await axios({
      url: 'https://api.igdb.com/v4/games',
      method: 'POST',
      headers: {
        'Client-ID': process.env.CLIENT_ID,
        Authorization: `Bearer ${auth}`,
        'Accept-Encoding': 'gzip,deflate,compress',
      },
      data: `${fields} where rating != null & screenshots != null & genres != (7) & genres != (35) & genres != (26) & genres != (30) & genres != (36); sort rating desc; limit 500;`,
    });
    return request.data;
  },
  getAllGenres: async () => {
    const auth = await getAuth();
    const request = await axios({
      url: 'https://api.igdb.com/v4/genres',
      method: 'POST',
      headers: {
        'Client-ID': process.env.CLIENT_ID,
        Authorization: `Bearer ${auth}`,
        'Accept-Encoding': 'gzip,deflate,compress',
      },
      data: 'fields name; where name != "Quiz/Trivia" & name != "Card & Board Game" & name != "Music" & name != "Pinball" & name !="MOBA"; limit 100;',
    });
    return request.data;
  },
};

export const handler = async () => {
  const games = await apiRequest.getAllGames();
  const genres = await apiRequest.getAllGenres();
  return {
    statusCode: 200,
    body: JSON.stringify({ games, genres }),
  };
};
