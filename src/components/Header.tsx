import React from 'react';
import { LangToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import logo from '../images/logo.png';

export const Header: React.FC = () => {
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
        <div className="header-help">Help Center</div>
        <div className="header-toggles">
          <LangToggle />
          <ThemeToggle />
          <div className="theme-toggle">Dark mode</div>
        </div>
      </div>
    </div>
  )
}