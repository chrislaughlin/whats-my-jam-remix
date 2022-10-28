import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import DisplayTrack from "~/DisplayTrack";

import { getRecentPlayed, parseTrack } from "~/utils";

export const loader = async () => {
    const recentlyPlayedSongs = await getRecentPlayed('50');
    const processedSongs = recentlyPlayedSongs.items.map(parseTrack)
    return json(processedSongs);
}

export default function PrevJams() {
    const jams = useLoaderData();

    return (
        <>
            {jams.map(({ id, name, album, artist, artWork, link }) => {
                return (
                    <DisplayTrack
                        name={name}
                        album={album}
                        artist={artist}
                        artWork={artWork}
                        link={link}
                        id={id}
                    />
                )
            })}
        </>
    )
}