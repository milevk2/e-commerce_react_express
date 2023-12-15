import { createContext, useState } from 'react';
import { language } from './language.js';


const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {

  const [isEnglish, setIsEnglish] = useState(true);
  const [specsEnum, setSpecsEnum] = useState({...language.en});

  const setLanguage = () => {
    setIsEnglish(state => state ? false : true)
    setSpecsEnum(()=> {

      return isEnglish ? {...language.bg} : {...language.en};
    })
  };

  return (
    <LanguageContext.Provider value={{ isEnglish, specsEnum, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageProvider, LanguageContext };
