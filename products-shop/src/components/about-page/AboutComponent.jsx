import { useContext } from "react";
import { LanguageContext } from "../../LanguageContext.jsx";
import './about.css'

const AboutComponent = () => {

    const { isEnglish } = useContext(LanguageContext);

    return (
        <>
            <div>
                <div className="welcome-text">

                    <h1>E-Commerce React Express Project</h1>
                    {isEnglish ?
                        <>
                            <p>
                                This is my MERN project which I use to train my knowledge on. It is not perfect - there are still many bugs
                                and not implemented functionalities and there are many things I have to work on. The main purpose is to train
                                my frontend, backend, database, api and design skills.
                            </p>


                            <ul className="feature-list">
                                <li>React.js for dynamic and responsive user interfaces.</li>
                                <li>Express.js server for handling backend logic and APIs.</li>
                                <li>Integration with a backend database for product management.</li>
                                <li>Mongoose as the MongoDB ODM for database integration.</li>
                                <li>Web-scraping service for generating dummy shop data (in development only).</li>
                                <li>User authentication and authorization for a personalized shopping experience.</li>
                                <li>Bulgarian version of the site available through LanguageContext.jsx. It takes the language from language enum in language.js.</li>
                                <li>Weather and News APIs integrated for user convenience.</li>
                                <li>Cache logic implemented on the backend for handling the limited API requests and data.</li>
                            </ul>
                        </>
                        :
                        <>
                            <p>
                                Това е моят MERN проект, който използвам за трениране на знанията си. Той не е перфектен - все още има много бъгове и нереализирани функционалности,
                                и има още много неща, по които трябва да работя. Основната цел е да тренирам уменията си във frontend, backend, бази данни, API и дизайн.
                            </p>

                            <ul className="feature-list">
                                <li>React.js за динамични и отзивчиви потребителски интерфейси.</li>
                                <li>Express.js сървър за обработка на бекенд логика и API.</li>
                                <li>Интеграция със заден край за управление на продукти в базата данни.</li>
                                <li>Mongoose като MongoDB ODM за интеграция с базата данни.</li>
                                <li>Уеб скрейпинг услуга за генериране на фиктивни данни за магазин (само при разработка).</li>
                                <li>Потребителска аутентикация и авторизация за персонализирано пазаруване.</li>
                                <li>Българска версия на сайта, достъпна чрез LanguageContext.jsx. Взема езика от енумерацията на езика в language.js.</li>
                                <li>Интеграция на API за времето и новини за удобство на потребителите.</li>
                                <li>Логика за кеширане, реализирана на бекенда за обработка на ограничените заявки и данни.</li>
                            </ul>
                        </>
                    }

                    <div className="apiContainer">

                        <a href="https://weatherstack.com/" target="_blank" className="item"><div className="weatherApi"><img src="https://weatherstack.com/site_images/weatherstack_logo_white.png" alt="WeatherStack API" /></div></a>
                        <a href="https://newsapi.org/" target="_blank" className="item">
                            <div className="newsApi">
                                <span className="blue">News </span>
                                <span className="white">API</span>
                            </div>
                        </a>
                        <a href="https://github.com/milevk2/e-commerce_react_express.git" target="_blank" className="item"><div className="gitHub">Project's GitHub:<i className="fa-brands fa-github icon"></i></div></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutComponent;
