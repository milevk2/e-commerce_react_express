import { useEffect, useState } from "react"
import { get } from '../../lib/request.js'
import styles from './WeatherApi.module.css'

const url = 'http://localhost:3000/getWeather'

const WeatherApi = () => {

    const [error, setError] = useState(false);
    const [weatherData, setWeatherData] = useState({});

    async function getWeatherData() {

        const response = await get(url, { 'Cache-Control': 'no-store'})

        if (!response.ok) setError(true);

        const newData = await response.json();

        const filteredData = {

            city: newData.location.name,
            time: newData.location.localtime,
            temperature: newData.current.temperature,
            icon: newData.current.weather_icons[0],
            description: newData.current.weather_descriptions[0]
        }
        setWeatherData({...filteredData});
    }

    useEffect(() => {

        getWeatherData();
        const updateInterval = 600 * 1000  //10 mins
        const intervalId = setInterval(getWeatherData, updateInterval);
        
        return () => {
            clearInterval(intervalId);
          };
    
    },[])

    return (

        <a href='https://weatherstack.com/'>
        <div className={styles.weatherBox}>
            <div className={styles.weatherSpec}>{weatherData.city}</div>
            <div className={styles.weatherSpec}><img src={weatherData.icon}></img></div>
            <div className={styles.weatherSpec}>{weatherData.temperature}°C</div>
            <div className={styles.weatherSpec}>{weatherData.description}</div>
            <div className={styles.weatherSpec}>{weatherData.time}</div>
        </div>
        </a>
    )
}

export default WeatherApi