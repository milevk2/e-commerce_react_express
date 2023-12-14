import { Routes, Route } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import HomeLoad from './components/HomeLoad.jsx';
import NotFound from './components/NotFound.jsx';
import ProductDetails from './components/product-details/ProductDetails.jsx';
import NavigationBar from './components/navigation-bar/NavigationBar.jsx';
import AddProductForm from './components/add-product/AddProductForm.jsx';
import ProductList from './components/product-list/ProductList.jsx';
import RegisterComponent from './components/user-register/RegisterComponent.jsx';
import LoginComponent from './components/user-login/LoginComponent.jsx';
import UserProfile from './components/user-profile/UserProfile.jsx';
import WeatherApi from './components/weather-api/WeatherApi.jsx';
import Spinner from './components/Spinner.jsx';
import { LoadingContext } from './LoadingContext.jsx';
import { LoggerContext } from './LoggerContext.jsx';
import styles from './App.module.css'
import '../public/styles/default.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [cart, setCart] = useState(false);
  const { isLoading } = useContext(LoadingContext);
  const { isLogged } = useContext(LoggerContext);

  return (

    <>
      <NavigationBar cart={cart} />
      {isLoading && <Spinner />}
      <div className={styles.main}>
        <WeatherApi />
        <Routes>
          <Route path="/" element={<HomeLoad />} />
          <Route path="/products/:productId" element={<ProductDetails setCart={setCart} />} />
          <Route path="/add_product" element={isLogged ? <AddProductForm /> : <NotFound />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/my_products" element={<ProductList myProducts={true} />} />
          <Route path="/Register" element={!isLogged ? <RegisterComponent /> : <NotFound />} />
          <Route path="/Login" element={!isLogged ? <LoginComponent /> : <NotFound />} /> 
          <Route path="/profile" element={isLogged && <UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <footer className={styles.footer}><p>All rights reserved &copy;</p></footer>
    </>
  )
}

export default App;
