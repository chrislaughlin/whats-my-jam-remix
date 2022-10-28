import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import DisplayTrack from "~/DisplayTrack";

import { getRecentPlayed, parseTrack } from '../utils';


export const loader = async () => {
  const recentlyPlayedSongs = await getRecentPlayed('1');
  const processedSongs = recentlyPlayedSongs.items.map(parseTrack)
  return json(processedSongs[0]);
}

export default function Index() {
  const {
    name,
    artist,
    artWork,
    link,
    id,
  } = useLoaderData();

  return (
    <DisplayTrack
      name={name}
      artist={artist}
      artWork={artWork}
      link={link}
      id={id}
    />
  );
}
