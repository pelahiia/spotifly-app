import React from 'react';
import { TrackType } from '../types/TrackType';
import play from '../images/play.png';
import favorite from '../images/favorite.png';
import addPlaylist from '../images/addPlaylist.png';


type Props = {
  track: TrackType;
  key: string;
}

export const TrackItem: React.FC<Props> = ({ track }) => {
  return (
    <div className="track-container">
      <div className="track-image-container">
        <img 
          src={track.albumUrl} 
          alt="Track Image" 
          className='track-image-container-img'
        />
      </div>
      <div className="track-info">
        <div className="track-title">{track.title}</div>
        <div className="track-artist">{track.artist}</div>
      </div>
      <div className="track-actions">
        <img 
          src={play} 
          alt="Play" 
          className='track-actions-item'
        />
        <img 
          src={favorite} 
          alt="Add to favorite" 
          className='track-actions-item'
        />
        <img 
          src={addPlaylist} 
          alt="Add to playlist" 
          className='track-actions-item'
        />
      </div>
    </div>
  )
}