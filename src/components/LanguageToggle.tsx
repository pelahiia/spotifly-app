import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";

export const LangToggle: React.FC = () => {
  const [select, setSelect] = useState("US");

  const onSelect = (code: string) => setSelect(code);

  return (
    <div className="language-toggle">
      <ReactFlagsSelect
        selected={select}
        onSelect={onSelect}
        countries={["UA", "US"]}
        customLabels={{"US": "ENG", "UA": "UKR"}}
      />
    </div>
  )
}