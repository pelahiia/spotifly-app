import React, { useState, useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from 'react-i18next';

export const LangToggle: React.FC = () => {
  const { i18n } = useTranslation();
  const [select, setSelect] = useState("US");

  // useEffect(() => {
  //   setSelect("US");
  // }, []);

  const onLanguageSelect = (code: string) => {

    i18n.changeLanguage(code);
    setSelect(code);
  };

  return (
    <div className="language-toggle">
      <ReactFlagsSelect
        selected={select}
        onSelect={onLanguageSelect}
        countries={["UA", "US"]}
        customLabels={{"US": "ENG", "UA": "UKR"}}
      />
    </div>
  )
}
