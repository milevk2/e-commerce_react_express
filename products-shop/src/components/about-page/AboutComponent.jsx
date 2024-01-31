import { useContext } from "react";
import { LanguageContext } from "../../LanguageContext.jsx";
import  './about.css'




const AboutComponent = () => {

    const { isEnglish } = useContext(LanguageContext);

    return (
        <>
            {isEnglish ? <div className="welcome-text">
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
                :
                <div className="welcome-text">
                    <h1>Добре дошли в Bultelecom Shop - Вашият най-добър избор за смартфони!</h1>

                    <p>Открийте най-новите постижения в технологиите и подобрете своето мобилно преживяване с нашата премиум селекция от
                        смартфони. В Bultelecom Shop ви представяме подбрана колекция от най-търсените устройства от водещи марки.</p>

                    <h2>Разгледайте Иновациите</h2>
                    <p>Поглезете се в света на иновациите и бъдете на преден план с нашата гама от смартфони, предлагащи най-новите
                        технологии, елегантен дизайн и мощна производителност.</p>

                    <h2>Пазарувайте с Увереност</h2>
                    <p>Научете се на безпроблемно пазаруване със защитени транзакции, бърза доставка и безпроблемни връщания. Нашите
                        служители от екипа за клиентска поддръжка са тук, за да ви помогнат на всяка стъпка.</p>

                    <h2>Ексклузивни Оферти</h2>
                    <p>Отключете ексклузивни сделки и промоции, гарантирайки си най-добрата стойност за вашия пари. Внимавайте за
                        специални предложения и ограничени времеви отстъпки за вашите любими устройства.</p>

                    <h2>Глобални Марки, Локално Обслужване</h2>
                    <p>Сътрудничим с глобално признати марки, за да ви представим смартфони, които преопределят отличието. Можете да
                        бъдете уверени, че нашето локално обслужване гарантира подкрепата, която ви е необходима, когато ви е нужна.</p>

                    <h2>Защо Да Изберете Нас?</h2>
                    <ul className="feature-list">
                        <li>Широка Гама от Смартфони</li>
                        <li>Защитено и Удобно Пазаруване</li>
                        <li>Експертна Клиентска Поддръжка</li>
                        <li>Ексклузивни Предложения и Отстъпки</li>
                    </ul>

                    <p>Добре дошли в бъдещето на мобилните технологии! Започнете да разглеждате нашата колекция сега и намерете
                        перфектния смартфон, който отговаря на вашия начин на живот.</p>

                    <p>Щастливо пазаруване в Bultelecom Shop!</p>
                </div>

            }
        </>
    )

}

export default AboutComponent;
