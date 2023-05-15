import React from 'react';

const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=d84eea95398744f8a8af56f1cc4aee70&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

export const Login: React.FC = () => {
  return (
    <div>
      <button>
        <a href={AUTH_URL}>
          Login with Spotify
        </a>
      </button>
    </div>
  )
}