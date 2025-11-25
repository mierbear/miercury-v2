"use client";

import ArtistType from "../types/artist";

function Artist({ artists }: { artists: ArtistType[] }) {
  return (
    <ul>
      {artists.map((artist) => (
        <li key={artist.id}>{artist.name}</li>
      ))}
    </ul>
  );
}

export default Artist;