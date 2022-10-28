import { stringify } from 'querystring';
import { config } from './config';


const encodeToBase64 = (str: string) => Buffer.from(str).toString('base64')

export const genAccessToken = async () => {
  const basicToken = encodeToBase64(`${config.clientId}:${config.clientSecret}`)

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: stringify({
      grant_type: 'refresh_token',
      refresh_token: config.refreshToken
    })
  })
  const responseData = await response.json();
  return responseData?.access_token
}

export const getRecentPlayed = async (limit: string) => {
  const token = await genAccessToken();

  const res = await fetch(
    `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  let data = await res.text();

  console.log(data);

  if (data.length > 0) {
    data = JSON.parse(data);
  }

  return data;
}

export const getTrack = async (trackId: string) => {
  const token = await genAccessToken();
  console.log(`getting track: ${trackId}`)

  const res = await fetch(
    `https://api.spotify.com/v1/tracks/${trackId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  let data = await res.text();

  console.log(data);

  if (data.length > 0) {
    data = JSON.parse(data);
  }

  return data;
}

export const parseTrack = (item: any) => {
  return {
    id: item.id || item.track.id,
    name: item.name || item.track.name,
    album: item.album?.name || item.track.album.name,
    artist: (item.artists && item.artists[0]?.name) || item.track.artists[0].name,
    artWork: item.album?.images[item.album?.images?.length - 2]?.url ||
      item.track.album.images[item.track.album.images.length - 2].url,
    socialPreview: item.album?.images[0]?.url ||
      item.track.album.images[0].url,
    link: item.uri || item.track.uri,
  }
}