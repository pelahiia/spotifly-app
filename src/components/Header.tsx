import React from 'react';
import { LangToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import logo from '../images/logo.png';
import { useTranslation } from 'react-i18next';

export const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="header">
      <div className="header-logo">
        <img 
          src={logo} 
          alt="Logo Image" 
          className="header-logo-image"
        />
        <div className="header-title">Spotifly</div>
      </div>
      <div className="header-items">
        <div className="header-help">{t('help')}</div>
        <div className="header-toggles">
          <LangToggle />
          <ThemeToggle />
          <div className="theme-toggle">Dark mode</div>
        </div>
      </div>
    </div>
  )
}