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
      callback={state => {
        if(!state.isPlaying) {
          setPlay(false);
        }
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  )
}