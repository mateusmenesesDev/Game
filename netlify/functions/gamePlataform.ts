import axios from 'axios';

async function getAuth() {
  const request = await axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`
  );
  return request.data.access_token;
}

async function getPlataformLogo(plataformId) {
  const auth = await getAuth();
  const { data } = await axios({
    url: 'https://api.igdb.com/v4/platform_logos',
    method: 'POST',
    headers: {
      'Client-ID': process.env.CLIENT_ID,
      Authorization: `Bearer ${auth}`,
      'Accept-Encoding': 'gzip,deflate,compress',
    },
    data: `fields *; where id = ${plataformId};`,
  });
  return data;
}

export const handler = async (event) => {
  const plataformLogo = await getPlataformLogo(
    event.queryStringParameters.logoId
  );
  return {
    statusCode: 200,
    body: JSON.stringify(plataformLogo[0]),
  };
};
