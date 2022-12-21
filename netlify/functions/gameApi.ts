import axios from 'axios';

async function getAuth() {
  const request = await axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`
  );
  return request.data.access_token;
}

const apiRequest = {
  getAllGames: async () => {
    const auth = await getAuth();
    const request = await axios({
      url: 'https://api.igdb.com/v4/games',
      method: 'POST',
      headers: {
        'Client-ID': process.env.CLIENT_ID,
        Authorization: `Bearer ${auth}`,
        'Accept-Encoding': 'gzip,deflate,compress',
      },
      data: 'fields name, rating, id, genres, screenshots.image_id; where rating != null; sort rating desc; limit 500;',
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
      data: 'fields name; id; limit 100;',
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
