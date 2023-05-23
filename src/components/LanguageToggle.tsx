import React from "react";

export const LangToggle: React.FC = () => {
  return (
    <div className="language-toggle">
      <div className="switch">
        <input id="language-toggle" className="check-toggle check-toggle-round-flat" type="checkbox"/>
        <label htmlFor="language-toggle"></label>
        <span className="on">UKR</span>
        <span className="off">EN</span>
  	  </div>
    </div>
  )
}