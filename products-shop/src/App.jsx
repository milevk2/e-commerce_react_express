import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import HomeLoad from './components/HomeLoad.jsx';
import NotFound from './components/NotFound.jsx';
import ProductDetails from './components/product-details/ProductDetails.jsx';
import NavigationBar from './components/navigation-bar/NavigationBar.jsx';
import AddProductForm from './components/add-product/AddProductForm.jsx';
import ProductList from './components/product-list/ProductList.jsx';
import RegisterComponent from './components/user-register/RegisterComponent.jsx';
import LoginComponent from './components/user-login/LoginComponent.jsx';
import WeatherApi from './components/weather-api/WeatherApi.jsx';
import '../public/styles/default.css'
import styles from './App.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  const [cart, setCart] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(()=> {

    if(token){

      const [header, payload, signature] = token.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      setUserId(decodedPayload._id)
      console.log(decodedPayload);
    }
    console.log(isLogged);

  },[isLogged])

  return (

    <>
      <NavigationBar cart={cart} isLogged={isLogged} setIsLogged={setIsLogged} token={token} setToken={setToken} userId={userId}/>
      

      <div className={styles.main}>
        
      <WeatherApi />
        <Routes>
          <Route path="/" element={<HomeLoad />} />
          <Route path="/products/:productId" element={<ProductDetails setCart={setCart} />} />
          <Route path="/add_product" element={isLogged? <AddProductForm /> : <NotFound />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/my_products" element={<ProductList logged={true}/>} />
          <Route path="/Register" element={!isLogged? <RegisterComponent /> : <NotFound />} />
          <Route path="/Login" element={!isLogged?<LoginComponent setIsLogged={setIsLogged}/> : <NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <footer className={styles.footer}><p>All rights reserved &copy;</p></footer>

    </>


  )
}

export default App;
