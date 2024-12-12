import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import LandingPage from "./components/LandingPage/LandingPage";
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import { CommonProvider } from './context/CommonContext';
import config from "./data/config.json";
import { getData } from "./components/utils";
import "./styles/landingPageStyles.js";

i18next.init({
  lng: config.defaultLanguage,
  fallbackLng: 'en',
  resources: {
    en: { translation: enTranslations },
    fr: { translation: frTranslations },
  },
});

export default function App() {
  // Fetch default language on app startup
  // useEffect(() => {
  //   async function loadInitialData() {
  //     const configResponse = await fetch('/config');
  //     const config = await configResponse.json();
  //     const translationsResponse = await fetch(`/translations/${config.defaultLanguage}`);
  //     const translations = await translationsResponse.json();

  //     setConfig(config);
  //     i18next.addResources(config.defaultLanguage, 'translation', translations);
  //     i18next.changeLanguage(config.defaultLanguage);
  //   }

  //   loadInitialData();
  // }, []);

  // Fetch translations dynamically on language change
  // const handleLanguageChange = async (newLanguage) => {
  //   const translationsResponse = await fetch(`/translations/${newLanguage}`);
  //   const translations = await translationsResponse.json();

  //   i18next.addResources(newLanguage, 'translation', translations);
  //   i18next.changeLanguage(newLanguage);
  // };

  const [language, setLanguage] = useState(config.defaultLanguage);
  
  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  const getLandingPageConfig = () => {
    const landingPageConfig = config.find((page) => page.name === 'LandingPage');
    if (landingPageConfig) {
      return landingPageConfig;
    } else {
      console.error('LandingPage config not found.');
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <CommonProvider 
      config={config}
      landingPageConfig={getLandingPageConfig()}
      landingPageData={getData()}
    >
      <I18nextProvider i18n={i18next}>
        <LandingPage onLanguageChange={handleLanguageChange} />
      </I18nextProvider>
    </CommonProvider>
  );
}
