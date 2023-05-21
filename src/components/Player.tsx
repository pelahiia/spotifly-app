import React, { useEffect, useState } from "react";
import SpotifyPlayer from 'react-spotify-web-playback';

type Props = {
  accessToken: string | null | undefined,
  trackUri: string | undefined,
}

export const Player: React.FC<Props> = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState<boolean>(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri])

  if (!accessToken) return null;
  return(
      <SpotifyPlayer 
        token={accessToken}
        showSaveIcon
        hideAttribution
        magnifySliderOnHover
        callback={state => {
          if(!state.isPlaying) {
            setPlay(false);
          }
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
        styles={{
          sliderTrackColor: '#ffe66d',
          sliderColor: '#343434',
          sliderHandleColor: '#2f3061',
          trackArtistColor: '#343434',
          trackNameColor: '#2f3061',
          bgColor: '#f7fff7',
          activeColor: '#ffe66d',
          color: '#2f3061',
        }}
      />
  )
}