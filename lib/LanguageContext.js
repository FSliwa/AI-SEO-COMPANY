'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('pl');

  useEffect(() => {
    const savedLang = localStorage.getItem('site_lang');
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const toggleLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('site_lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
