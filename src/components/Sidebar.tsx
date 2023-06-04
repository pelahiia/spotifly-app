import React from "react";
import logo from '../images/logo.png';
import { ThemeToggle } from "./ThemeToggle";
import { LangToggle } from "./LanguageToggle";
import { useTranslation } from 'react-i18next';

export const SideBar: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    window.location.href = '/';
  };
  const { t } = useTranslation();

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img 
          src={logo} 
          alt="Logo Image" 
          className="sidebar-logo-image"
        />
        <div className="sidebar-title">Spotifly</div>
      </div>
      <div className="sidebar-toggles">
        <LangToggle />
      </div>
      <div className="sidebar-items">
        <div className="sidebar-item">{t('search')}</div>
        <div className="sidebar-item">{t('favorites')}</div>
        <div className="sidebar-item">{t('playlists')}</div>
        <div className="sidebar-item">
          <a 
            href="/"
            onClick={handleLogout}
            className="sidebar-item"
          >
            {t('logout')}
          </a>
        </div>
      </div>
      <div className="sidebar-toggles">
        <ThemeToggle />
        <div className="theme-toggle">Dark mode</div>
      </div>
      <div className="sidebar-help">{t('help')}</div>
    </div>
  )
}