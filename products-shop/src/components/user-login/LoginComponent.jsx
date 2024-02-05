import styles from './LoginComponent.module.css'
import { login } from '../../services/userService.js'
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react';
import { LoggerContext } from '../../LoggerContext.jsx';
import { LanguageContext } from '../../LanguageContext.jsx';
import { CartContext } from '../../CartContext.jsx';



const LoginComponent = ({ setIsLogged }) => {

  const navigate = useNavigate();
  const [logError, setLogError] = useState(false);
  const { logInLogOut } = useContext(LoggerContext);
  const { isEnglish } = useContext(LanguageContext);
  const { setIsToken, setCartItems, setCartCounter, setTotalPrice } = useContext(CartContext);

  async function handleSubmit(e) {

    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))

    try {

      const response = await login(formData);
      if (!response.ok) return setLogError(true);
      const userData = await response.json();
      setIsToken(userData.token); // forwards the token to the CartContext
      logInLogOut(userData.token);
      const cartItems = userData.cart;
      setCartItems([...cartItems]);
      navigate('/my_products');

    }
    catch (err) {

      console.log('Login failed:', err);
      setLogError(true)
    }

  }

  return (
    <>
      <form className={styles.loginPanel} onSubmit={handleSubmit}>
        <label htmlFor="email">{isEnglish ? 'Email:' : 'Имейл:'}</label>
        <input
          type="text"
          id="email"
          name="email"
          className={styles.rounded}
        />

        <label htmlFor="password">{isEnglish ? 'Password:' : 'Парола:'}</label>
        <input
          type="password"
          id="password"
          name="password"
          className={styles.rounded}
        />

        <button type="submit" className={styles.submitButton}>
          {isEnglish ? 'Login' : 'Вход'}
        </button>
        {logError ? <div className={logError ? styles.error : styles.hidden}>{isEnglish ? 'User email or password do not match!' : 'Неправилно потребителско име или парола!'}</div> : ''}
      </form>
      
    </>
  )

}

export default LoginComponent;