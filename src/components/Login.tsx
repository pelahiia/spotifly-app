import React from 'react';;
import loginImage from '../images/loginImage.png';
import { useAuth } from '../hooks/useAuth';
import { Header } from './Header';
import { useTranslation } from 'react-i18next';

const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=d84eea95398744f8a8af56f1cc4aee70&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

export const Login: React.FC = () => {
  const { loggedIn } = useAuth(null);
  const { t } = useTranslation();

  return (
    <>
      { !loggedIn && <Header /> }
      <div className='login-page'>
        <div className="login-content">
          <h1 className="login-title">Spotifly!</h1>
          <p className="login-description">
            {t('startPageText')}
          </p>
          <button className='login-button'>
            <a 
              href={AUTH_URL}
              className='login-button-text'
            >
              {t('login')}
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