import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import DisplayTrack from "~/DisplayTrack";

import { getTrack, parseTrack } from '../utils';

interface Params {
    jamId: string;
}

interface Data {
    params: Params
}

export const loader = async ({ params }: Data) => {
    const trackData = await getTrack(params.jamId);

    return json(parseTrack(trackData));
}

export const meta = ({
    data,
  }) => {
    const { 
        name,
        artist,
        socialPreview,
     } = data;
    return {
      "og:title": `${name} - ${artist} - Whats My Jam!`,
      "og:image": socialPreview,
      "twitter:card": 'summary',
    };
  };

export default function Index() {
    const {
        name,
        artist,
        artWork,
        link,
    } = useLoaderData();

    return (
        <DisplayTrack
            name={name}
            artist={artist}
            artWork={artWork}
            link={link}
        />
    );
}
