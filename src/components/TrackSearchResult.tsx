import React from 'react';
import { TrackType } from '../types/TrackType';

type Props = {
  track: TrackType;
  key: string;
}

export const TrackSearchResult: React.FC<Props> = ({ track }) => {
  return (
    <div className="track-container">
      <img src={track.albumUrl} alt="Track Image" />
      <div className="track-title">{track.title}</div>
      <div className="track-artist">{track.artist}</div>
    </div>
  )
}