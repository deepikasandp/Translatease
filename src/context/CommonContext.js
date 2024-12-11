import React, { createContext, useContext, useState } from 'react';

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

  const handleChange = (path, value) => {
    const setDeep = (obj, path, value) => {
      const keys = path.split('.');
      const lastKey = keys.pop();
      const lastObj = keys.reduce((o, key) => o[key] = o[key] || {}, obj);
      lastObj[lastKey] = value;
      return { ...obj };
    };

    setLandingPageData((prevData) => setDeep(prevData, path, value));
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