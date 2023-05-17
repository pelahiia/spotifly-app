import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import SpotifyWebApi from 'spotify-web-api-node';

const spofityApi = new SpotifyWebApi({
  clientId: 'd84eea95398744f8a8af56f1cc4aee70',
});

type Props = {
  code: string | null,
}

export const Dashboard: React.FC<Props> = ({ code }) => {
  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const accessToken = useAuth(code);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (!accessToken) return 
      spofityApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if(!search) return setSearchResults([]);
    if (!accessToken) return 

    spofityApi.searchTracks(search).then(res => {
      if (res.body.tracks) {
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (!image.height) return smallest;
              if (!smallest.height) return image;
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            url: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        });
      }
    })
  }, [search, accessToken])

  return(
    <div>
      <form action="">
        <input 
          type="search"
          value={search}
          onChange={handleSearch}
          placeholder='Search your favorite song or artist'
        />
      </form>
    </div>
  )
}