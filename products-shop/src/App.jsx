import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import HomeLoad from './components/HomeLoad.jsx';
import NotFound from './components/NotFound.jsx';
import ProductDetails from './components/product-details/ProductDetails.jsx';
import NavigationBar from './components/navigation-bar/NavigationBar.jsx';
import AddProductForm from './components/add-product/AddProductForm.jsx';
import ProductList from './components/product-list/ProductList.jsx';
import '../public/styles/default.css'
import styles from './App.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherApi from './components/weather-api/WeatherApi.jsx';

function App() {

  const [cart, setCart] = useState(false);

  return (

    <>
      <NavigationBar cart={cart} />
      

      <div className={styles.main}>
        
      <WeatherApi />
        <Routes>
          <Route path="/" element={<HomeLoad />} />
          <Route path="/products/:productId" element={<ProductDetails setCart={setCart} />} />
          <Route path="/add_product" element={<AddProductForm />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <footer className={styles.footer}><p>All rights reserved &copy;</p></footer>

    </>


  )
}

export default App;
