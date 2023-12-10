import { useEffect, useState } from "react";
import styles from './styles.module.css'



const HomeLoad = () => {


    return (

        <div className="welcome-text">
            <h1>Welcome to Bultelecom Shop - Your Ultimate Destination for Smartphones!</h1>

            <p>Discover the latest in cutting-edge technology and elevate your mobile experience with our premium selection
                of smartphones. At Bultelecom Shop, we bring you a curated collection of the most sought-after devices from top
                brands.</p>

            <h2>Explore Innovation</h2>
            <p>Immerse yourself in the world of innovation and stay ahead with our range of smartphones featuring the latest
                technologies, sleek designs, and powerful performance.</p>

            <h2>Shop with Confidence</h2>
            <p>Enjoy a seamless shopping experience with secure transactions, fast shipping, and hassle-free returns. Our
                customer support team is here to assist you every step of the way.</p>

            <h2>Exclusive Deals</h2>
            <p>Unlock exclusive deals and promotions, ensuring you get the best value for your money. Keep an eye out for
                special offers and limited-time discounts on your favorite devices.</p>

            <h2>Global Brands, Local Service</h2>
            <p>We partner with globally renowned brands to bring you smartphones that redefine excellence. Rest assured, our
                local service ensures you get the support you need, whenever you need it.</p>

            <h2>Why Choose Us?</h2>
            <ul className="feature-list">
                <li>Wide Range of Smartphones</li>
                <li>Secure and Convenient Shopping</li>
                <li>Expert Customer Support</li>
                <li>Exclusive Offers and Discounts</li>
            </ul>

            <p>Welcome to the future of mobile technology! Start exploring our collection now and find the perfect smartphone
                that suits your lifestyle.</p>

            <p>Happy shopping at Bultelecom Shop!</p>
        </div>

    )

}

export default HomeLoad;
