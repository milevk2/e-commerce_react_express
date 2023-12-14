import styles from './LoginComponent.module.css'
import { login } from '../../services/userService.js'
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react';
import { LoggerContext } from '../../LoggerContext.jsx';


const LoginComponent = ({ setIsLogged }) => {

  const navigate = useNavigate();
  const [logError, setLogError] = useState(false);
  const {logInLogOut} = useContext(LoggerContext);

  async function handleSubmit(e) {

    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))

    try {

      const response = await login(formData);
      if (!response.ok) return setLogError(true);
      const token = await response.json();
      logInLogOut(token);
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
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        className={styles.rounded}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        className={styles.rounded}
      />

      <button type="submit" className={styles.submitButton}>
        Login
      </button>
    </form>
    {logError? <div className={logError ? styles.error : styles.hidden}>User email or password do not match!</div> : ''}
    </>
    )

}

export default LoginComponent;