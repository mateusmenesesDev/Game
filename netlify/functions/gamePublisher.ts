import axios from 'axios';

async function getAuth() {
  const request = await axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`
  );
  return request.data.access_token;
}

async function getCompany(companyId: string) {
  const auth = await getAuth();
  const request = await axios({
    url: 'https://api.igdb.com/v4/companies',
    method: 'POST',
    headers: {
      'Client-ID': process.env.CLIENT_ID,
      Authorization: `Bearer ${auth}`,
      'Accept-Encoding': 'gzip,deflate,compress',
    },
    data: `fields name, id; where id = ${companyId};`,
  });
  return request.data;
}

export const handler = async (event) => {
  const company = await getCompany(event.queryStringParameters.companyId);
  return {
    statusCode: 200,
    body: JSON.stringify(company),
  };
};
