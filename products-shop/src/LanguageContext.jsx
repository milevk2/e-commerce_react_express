import { createContext, useState } from 'react';

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {

  const [isEnglish, setIsEnglish] = useState(true);

  const setLanguage = () => {
    setIsEnglish(state => state ? false : true)
  };

  return (
    <LanguageContext.Provider value={{ isEnglish, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageProvider, LanguageContext };
