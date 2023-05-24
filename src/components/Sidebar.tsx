import React from "react";
import logo from '../images/logo.png';
import { ThemeToggle } from "./ThemeToggle";
import { LangToggle } from "./LanguageToggle";

export const SideBar: React.FC = () => {
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
        <div className="sidebar-item">Search</div>
        <div className="sidebar-item">Favorites</div>
        <div className="sidebar-item">Playlists</div>
        <div className="sidebar-item">Logout</div>
      </div>
      <div className="sidebar-toggles">
        <ThemeToggle />
        <div className="theme-toggle">Dark mode</div>
      </div>
      <div className="sidebar-help">Help Center</div>
    </div>
  )
}