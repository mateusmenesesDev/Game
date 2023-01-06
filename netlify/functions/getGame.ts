import axios from 'axios';

async function getAuth() {
  const request = await axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`
  );
  return request.data.access_token;
}

const apiRequest = {
  getGameById: async (gameId) => {
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
      data: `${fields} where (id = ${gameId}); limit 1;`,
    });
    return request.data;
  },

  getGameByName: async (gameId) => {
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
      data: `${fields} search *"${gameId}"*; limit 10;`,
    });
    return request.data;
  },
};

export const handler = async (event) => {
  if (isNaN(event.queryStringParameters.gameId)) {
    const games = await apiRequest.getGameByName(
      event.queryStringParameters.gameId
    );
    return {
      statusCode: 200,
      body: JSON.stringify([...games]),
    };
  } else {
    const games = await apiRequest.getGameById(
      event.queryStringParameters.gameId
    );
    return {
      statusCode: 200,
      body: JSON.stringify(games),
    };
  }
};

// PRECISO GUARDAR ESSA REQUEST
// const data = await axios.post(
//   'https://api.igdb.com/v4/games',
//   `fields *; where release_dates.platform = 6 & name !~ *"edition"* & release_dates.date > 1538129354 & hypes > 50; sort hypes desc; limit 100;`,
//   {
//     headers: {
//       'Client-ID': process.env.CLIENT_ID,
//       Authorization: `Bearer ${auth}`,
//       'Accept-Encoding': 'gzip,deflate,compress',
//     },
//   }
// );
