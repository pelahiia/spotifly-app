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
      <div className="sidebar-item">Search</div>
      <div className="sidebar-item">Favorites</div>
      <div className="sidebar-item">Playlists</div>
      <div className="sidebar-item">Logout</div>
      <div className="sidebar-item sidebar-toggles">
        <ThemeToggle />
        <LangToggle />
      </div>
    </div>
  )
}