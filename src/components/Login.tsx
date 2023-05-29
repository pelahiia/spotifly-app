import React from 'react';;
import loginImage from '../images/loginImage.png';
import { useAuth } from '../hooks/useAuth';
import { Header } from './Header';

const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=d84eea95398744f8a8af56f1cc4aee70&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

export const Login: React.FC = () => {
  const { loggedIn } = useAuth(null);

  return (
    <>
      { !loggedIn && <Header /> }
      <div className='login-page'>
        <div className="login-content">
          <h1 className="login-title">Spotifly!</h1>
          <p className="login-description">
            Prepare to embark on a musical journey that defies gravity. Whether you're seeking inspiration, relaxation, or an energy boost, Spotifly is your ticket to a musical adventure that will make your spirit soar. Get ready to experience music like never before as Spotifly takes you on a thrilling flight of auditory delight.
          </p>
          <button className='login-button'>
            <a 
              href={AUTH_URL}
              className='login-button-text'
            >
              Login with Spotify
            </a>
          </button>
        </div>
        <div className="login-image">
          <img src={loginImage} alt="Login Image" />
        </div>
      </div>
    </> 
  )
}