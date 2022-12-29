import axios from 'axios';

async function getAuth() {
  const request = await axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`
  );
  return request.data.access_token;
}

const apiRequest = {
  getGame: async (gameId) => {
    const fields =
      'fields name, rating, id, genres, screenshots.image_id, videos.video_id, created_at, first_release_date, involved_companies.*, platforms.*, similar_games.cover.image_id, summary, cover.image_id;';
    const auth = await getAuth();
    const request = await axios({
      url: 'https://api.igdb.com/v4/games',
      method: 'POST',
      headers: {
        'Client-ID': process.env.CLIENT_ID,
        Authorization: `Bearer ${auth}`,
        'Accept-Encoding': 'gzip,deflate,compress',
      },
      data: `${fields} where id = (${gameId}); limit 500;`,
    });
    return request.data;
  },
};

export const handler = async (event) => {
  const games = await apiRequest.getGame(event.queryStringParameters.gameId);
  return {
    statusCode: 200,
    body: JSON.stringify(games),
  };
};
