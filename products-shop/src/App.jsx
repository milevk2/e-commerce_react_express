import { Routes, Route } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
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
import '../public/styles/default.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CartComponent from './components/cart/CartComponent.jsx';
import AboutComponent from './components/about-page/AboutComponent.jsx';
import HomeComponent from './components/home-page/HomeComponent.jsx';


function App() {


  const { isLoading } = useContext(LoadingContext);
  const { isLogged } = useContext(LoggerContext);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 575);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 575);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])


  return (

    <>

      <NavigationBar />
      {isSmallScreen && isLogged && <div className='smallCart'><CartComponent /></div>}
      {isLoading && <Spinner />}
      <div className='main'>
        {/* <WeatherApi /> */}
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/products/:productId" element={<ProductDetails isSmallScreen={isSmallScreen} />} />
          <Route path="/add_product" element={isLogged ? <AddProductForm /> : <NotFound />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/my_products" element={<ProductList myProducts={true} />} />
          <Route path="/Register" element={!isLogged ? <RegisterComponent /> : <NotFound />} />
          <Route path="/Login" element={!isLogged ? <LoginComponent /> : <NotFound />} />
          <Route path="/profile" element={isLogged && <UserProfile />} />
          <Route path="/About" element={<AboutComponent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <footer className='footer'><p>All rights reserved &copy;</p></footer>
    </>
  )
}

export default App;
