import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import { TrackType } from '../types/TrackType';
import { TrackItem } from './TrackItem';
import { Player } from './Player';
import { SideBar } from './Sidebar';
import searchImage from '../images/trackImage.png';

const spofityApi = new SpotifyWebApi({
  clientId: 'd84eea95398744f8a8af56f1cc4aee70',
});

type Props = {
  code: string | null,
}

export const Dashboard: React.FC<Props> = ({ code }) => {
  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<TrackType[]>([]);
  const [playingTrack, setPlayingTrack] = useState<TrackType>();
  const [lyrics, setLyrics] = useState<string>('');

  const chooseTrack = (track: TrackType) => {
    setPlayingTrack(track);
    setSearch('');
    setLyrics('');
  }

  const accessToken = useAuth(code);
  console.log(searchResults);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (!playingTrack) return

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
  }, [playingTrack])

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
      <div className="dashboard">
        <SideBar />
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
                  chooseTrack={chooseTrack}
                />
              ))}
              {playingTrack && (
                <div className="track-lyrics-container">
                  <pre className="track-lyrics">{lyrics}</pre>
                </div>
              )}
              {searchResults.length === 0 && !playingTrack && (
                <div className="search-container">
                  <div className="search-text">
                    Discover your favorite songs and artists effortlessly with Spotifly's powerful search feature. Explore a vast musical universe by typing in song titles, artist names, or keywords, and let the music take flight.
                  </div>
                  <div className="search-image">
                    <img 
                      src={searchImage} 
                      alt="Search Image" 
                      className='search-illustration'
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='player-container'>
            <Player
              accessToken={accessToken}
              trackUri={playingTrack?.url}
            />
          </div>
        </div>
      </div>
  )
}