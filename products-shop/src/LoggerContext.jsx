import { createContext, useState } from 'react';
import jwtParser from './lib/jwtParser.js';

const LoggerContext = createContext();


const LoggerProvider = ({ children }) => {

    const [isLogged, setIsLogged] = useState(sessionStorage.getItem('authToken') ? sessionStorage.getItem('authToken') : false);
    const [token, setToken] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');
    

    const logInLogOut = (tokenArg=null) => {

        setIsLogged(state => {

            if (state == false && tokenArg !== null){

                const payload = jwtParser(tokenArg);
                setToken(tokenArg);
                setUserName(payload.userName);
                setUserEmail(payload.email);
                setUserId(payload._id);
                sessionStorage.setItem('authToken', tokenArg);
                
                return true;
            }

            setToken('');
            setUserName('');
            setUserEmail('');
            setUserId('');
            sessionStorage.removeItem('authToken');
            return false;
        } )
    };

    return (
        <LoggerContext.Provider value={{ isLogged, token, userName, userEmail, userId, logInLogOut }}>
            {children}
        </LoggerContext.Provider>
    );
};

export { LoggerProvider, LoggerContext};
