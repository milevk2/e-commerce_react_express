import { createContext, useState } from 'react';

const LoadingContext = createContext();


const LoadingProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = () => {
   setIsLoading(state => state ? false : true)
  };

  return (
    <LoadingContext.Provider value={{ isLoading, toggleLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingProvider, LoadingContext };
