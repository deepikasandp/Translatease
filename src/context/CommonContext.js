import React, { createContext, useContext, useState } from 'react';
import { assocPath } from "ramda";

const CommonContext = createContext({
  config: [],
  landingPageConfig: {},
  landingPageData: {},
  setConfig: () => {},
  setData: () => {},
});

export const CommonProvider = ({ children, config, landingPageConfig, landingPageData }) => {
  const [currentConfig, setConfig] = useState(config);
  const [currentLandingPageConfig, setLandingPageConfig] = useState(landingPageConfig);
  const [currentLandingPageData, setLandingPageData] = useState(landingPageData);

  // Using Ramda's assocPath for immutability
  const handleChange = (path, value) => {
    setLandingPageData((prevData) => assocPath(path.split("."), value, prevData));
  };

  return (
    <CommonContext.Provider
      value={{
        config: currentConfig,
        landingPageConfig: currentLandingPageConfig,
        landingPageData: currentLandingPageData,
        setLandingPageConfig,
        setLandingPageData,
        setConfig,
        handleChange,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

export const useCommonContext = () => useContext(CommonContext);
