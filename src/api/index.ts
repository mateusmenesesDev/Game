import axios from 'axios';

const id = 'qbycagn9ptm7rdsydum5kk8rrze9tl';
const secret = 'emizigjk8que768crwbp74h2v94j8d';

export async function games() {
  const { data } = await axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${id}&client_secret=${secret}&grant_type=client_credentials`
  );
  const config = {
    headers: {
      Authorization: `Bearer ${data.access_token}`,
      'Client-ID': id,
    },
  };
  const teste = await axios.post('https://api.igdb.com/v4/games', null, config);
}
