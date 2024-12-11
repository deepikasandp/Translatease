import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import LandingPage from "./components/LandingPage/LandingPage";
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import landingPageconfig from "./data/LandingPage/config.json";
import { getData } from "./components/utils";
import "./styles/styles.css";

i18next.init({
  lng: landingPageconfig.defaultLanguage,
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

  const [language, setLanguage] = useState(landingPageconfig.defaultLanguage);
  
  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <I18nextProvider i18n={i18next}>
      <LandingPage 
        config={landingPageconfig}
        object={getData()}
        onLanguageChange={handleLanguageChange}
      />
    </I18nextProvider>
  );
}
