import styles from './LoginComponent.module.css'
import { login } from '../../services/userService.js'
import { useNavigate } from 'react-router-dom'


const LoginComponent = ({ setIsLogged }) => {

  const navigate = useNavigate();

  async function handleSubmit(e) {

    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))

    try {

      const response = await login(formData);
      const token = await response.json();
      localStorage.setItem('authToken', token);
      setIsLogged(true)
      navigate('/')

    }
    catch (err) {

      console.log('Login failed:', err);
    }

  }

  return (

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
    </form>)

}

export default LoginComponent;