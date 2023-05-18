import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import { TrackType } from '../types/TrackType';
import { TrackItem } from './TrackItem';
import tracksSearchImage from '../images/trackImage.png'

const spofityApi = new SpotifyWebApi({
  clientId: 'd84eea95398744f8a8af56f1cc4aee70',
});

type Props = {
  code: string | null,
}

export const Dashboard: React.FC<Props> = ({ code }) => {
  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<TrackType[]>([]);
  const accessToken = useAuth(code);
  console.log(searchResults);
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

    let cancel = false;

    spofityApi.searchTracks(search).then(res => {
      if (cancel) return;
      if (res.body.tracks) {
        setSearchResults(res.body.tracks.items.map(track => {
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
        }));
      }
    })
    return () => {
      cancel = true;
    };
  }, [search, accessToken])

  return(
    <div className="dashboard-container">
      <div className='dashboard-tracks'>
        <form 
          action="/search" 
          method="get"
          className='dashboard-form'
        >
          <input 
            type="search"
            value={search}
            onChange={handleSearch}
            placeholder='Search your favorite song or artist'
            className='dashboard-input'
          />
        </form>
        <div className="results-list">
          {searchResults.map(track => (
            <TrackItem
              track={track} 
              key={track.url}
            />
          ))}
        </div>
      </div>
    </div>
  )
}