import { useEffect, useState } from "react"
import styles from './WeatherApi.module.css'
import callUtilityService from "../../services/utility.js";
// import {VITE_API_URL} from '../../services/host.js'
// import { get } from '../../lib/request.js'
// const url = `${VITE_API_URL}/getWeather`



const WeatherApi = () => {

    const [error, setError] = useState(false);
    const [weatherData, setWeatherData] = useState({});

    async function getWeatherData() {

        const response = await callUtilityService('getWeather'); /*await get(url, { 'Cache-Control': 'no-store'}) */

        if (!response.ok) setError(true);

        const newData = await response.json();

        const filteredData = {

            city: newData.location.name,
            time: newData.location.localtime,
            temperature: newData.current.temperature,
            icon: newData.current.weather_icons[0],
            description: newData.current.weather_descriptions[0]
        }
        setWeatherData({ ...filteredData });
    }

    useEffect(() => {

        getWeatherData();
        const updateInterval = 20 * 60 * 1000; //20 mins
        const intervalId = setInterval(getWeatherData, updateInterval);

        return () => {
            clearInterval(intervalId);
        };

    }, [])

    return (
        <>
            {error == true || !weatherData.city ? ''
                :
                <div className={styles.weatherBox}>
                    <a href='https://weatherstack.com/' className={styles.weatherBoxA}>

                        <div className={styles.weatherSpec}>{weatherData.city}</div>
                        <div className={styles.weatherSpec}><img src={weatherData.icon}></img></div>
                        <div className={styles.weatherSpec}>{weatherData.temperature}°C</div>
                        <div className={styles.weatherSpec}>{weatherData.description}</div>
                        <div className={styles.weatherSpec}>{weatherData.time}</div>
                    </a>
                </div>
            }
        </>
    )
}

export default WeatherApi