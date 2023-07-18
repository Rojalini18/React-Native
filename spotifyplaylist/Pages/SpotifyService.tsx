import axios from 'axios';

export async function exchangeCodeForToken(code: string) {
  const tokenEndpoint = 'https://accounts.spotify.com/api/token';
  const clientId = '4f15ffccd0d8446d8d86253c8baae7ad';
  const clientSecret = 'e77758cf380b4afd858e087c131ad253';
  const redirectUri = 'myspotify';

  const data = new URLSearchParams();
  data.append('grant_type', 'authorization_code');
  data.append('code', code);
  data.append('redirect_uri', redirectUri);

  const response = await axios.post(tokenEndpoint, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`,
      ).toString('base64')}`,
    },
  });

  return response.data;
}
