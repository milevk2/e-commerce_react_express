import styles from './Navigation.module.css';
import React, { useContext } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../services/userService.js';
import { LoggerContext } from '../../LoggerContext.jsx';
import { LanguageContext } from '../../LanguageContext.jsx';
import { CartContext } from '../../CartContext.jsx';
import CartComponent from '../cart/CartComponent.jsx';


function NavigationBar() {


  const { isLogged, logInLogOut, token } = useContext(LoggerContext);
  const { isEnglish, setLanguage } = useContext(LanguageContext);
  const { resetContextState } = useContext(CartContext);

  const navigate = useNavigate();

  async function onUserLogOut() {

    const response = await logout(token);
    const isLoggedOut = await response.json();

    if (isLoggedOut) {
      resetContextState();
      logInLogOut()
      navigate('/');
    }
    else {

      console.log('Problem with logging out!');
    }
  }

  const linkStyle = {
    color: 'white',
  };


  return (
    <Navbar bg="green" variant="green" expand="sm" style={{ backgroundColor: '#4CAF50' }}>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" style={linkStyle} />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <div className={styles.encapsulated}>
            <Nav.Link as={NavLink} to="/" style={linkStyle} className={styles.scale}> <i className="fa-solid fa-bars"></i> {isEnglish ? 'Home' : 'Начало'}</Nav.Link>

            <Nav.Link as={NavLink} to="/products" style={linkStyle} className={styles.scale}>{isEnglish ? 'Products' : 'Продукти'}</Nav.Link>
            {isLogged ?
              <div className={styles.user}>
                <Nav.Link as={NavLink} to={`/my_products`} style={linkStyle} className={styles.scale}>{isEnglish ? 'My Products' : 'Моите Продукти'}</Nav.Link>
                <Nav.Link as={NavLink} to="/add_product" style={linkStyle} className={styles.scale}>{isEnglish ? 'Add Products' : 'Добави Продукти'}</Nav.Link>
                <Nav.Link as={NavLink} to="/profile" style={linkStyle} className={styles.scale}>{isEnglish ? 'Profile' : 'Профил'}</Nav.Link>
                <Nav.Link as={NavLink} to="/" style={linkStyle} className={styles.scale} onClick={onUserLogOut}>{isEnglish ? 'Logout' : 'Изход'}</Nav.Link>

              </div>
              :
              <div className={styles.guest}>
                <Nav.Link as={NavLink} to="/Register" style={linkStyle} className={styles.scale}>{isEnglish ? 'Register' : 'Регистрация'}</Nav.Link>
                <Nav.Link as={NavLink} to="/Login" style={linkStyle} className={styles.scale}>{isEnglish ? 'Login' : 'Вход'}</Nav.Link>
              </div>}
              <Nav.Link as={NavLink} to="/About" style={linkStyle} className={styles.scale} >{isEnglish ? 'About' : 'Относно'}</Nav.Link>
          </div>
        </Nav>
        <div className={styles.utilities}>

          {isLogged && <CartComponent />}

          <div className={styles.language} onClick={setLanguage} title={isEnglish ? "Смени езика на български (BG)" : "Change language to english (EN)"}></div>
          <Form className="d-flex my-2 my-lg-0">
            <Form.Control type="text" id="searchBar" placeholder={isEnglish ? 'Search' : 'Търсене'} />
            <Button variant="outline-light" className="my-2 my-sm-0" type="submit">
              {isEnglish ? 'Search' : 'Търсене'}
            </Button>
          </Form>
        </div>

      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;