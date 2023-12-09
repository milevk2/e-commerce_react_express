import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import styles from './Navigation.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../services/userService.js';


function NavigationBar({ cart, isLogged, setIsLogged, token, setToken, userId }) {

  const [isHidden, setIsHidden] = useState(true);
  const [cartCounter, setCartCounter] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {

    if (cart) {

      setCartCounter(cartCounter => cartCounter + 1)
      setIsHidden(false);

      setTimeout(() => {

        setIsHidden(true);


      }, 3000)
    }
  }, [cart])

  
  async function onUserLogOut() {

    const token = localStorage.getItem('authToken');
    const response = await logout(token);
    const isLoggedOut = await response.json();

    if(isLoggedOut) {

      localStorage.removeItem('authToken');
      setIsLogged(false);
      setToken('');
      navigate('/');
    }
    else {

      console.log('Problem with logging out!');
    }
    
  }

  const navbarStyle = {
    backgroundColor: '#4CAF50',
  };

  const linkStyle = {
    color: 'white',
  };


  return (
    <Navbar bg="green" variant="green" expand="sm" style={navbarStyle}>
      <Navbar.Brand as={Link} to="/" style={linkStyle}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"></path>
        </svg>
        Продукти
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/" style={linkStyle}>Home</Nav.Link>
          
          <Nav.Link as={NavLink} to="/products" style={linkStyle}>Products</Nav.Link>
          { isLogged ? 
          <div className={styles.user}>
          <Nav.Link  as={NavLink} to={`/my_products`} style={linkStyle}>My Products</Nav.Link>
          <Nav.Link as={NavLink} to="/add_product" style={linkStyle}>Add Products</Nav.Link>
          <Nav.Link as={NavLink} to="/"style={linkStyle} onClick={onUserLogOut}>Logout</Nav.Link>
          </div> 
          : 
          <div className={styles.guest}>
            <Nav.Link as={NavLink} to="/Register" style={linkStyle}>Register</Nav.Link>
            <Nav.Link as={NavLink} to="/Login" style={linkStyle}>Login</Nav.Link>
          </div>}
        </Nav>

        <div className={styles.cart}>
          <div className={`${styles.cartCounter} ${cartCounter < 1 ? styles.hidden : ''}`}> {`${cartCounter < 1 ? 0 : cartCounter}`}</div>
          <div className={`alert alert-success ${isHidden ? styles.hiding : styles.itemAdded}`} role="alert">
            This item has been added to the cart!
          </div>

          <div className={styles.cartItems}></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" className={`bi bi-cart ${styles.absolute}`} viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
          </svg>
        </div>

        <Form className="d-flex my-2 my-lg-0">
          <Form.Control type="text" id="searchBar" placeholder="Search" />
          <Button variant="outline-light" className="my-2 my-sm-0" type="submit">
            Search
          </Button>
        </Form>

      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;