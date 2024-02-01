import { useEffect, useState } from "react"
import callUtilityService from "../../services/utility.js";
import styles from "./HomeComponent.module.css"


const HomeComponent = () => {

    const [news, setNews] = useState([]);

    useEffect(() => {

        callUtilityService('news').then(data => data.json()).then(result => {


            let arr = result["articles"]
            setNews(arr.slice(1, 10));
        }
        ).catch(err => console.log('The news will not be updated! ', err))


    }, [])


    return (

        <div className={styles.news}>

            <h2 className="headerDiv">LATEST TECH NEWS</h2>
            {news.map(article =>
            
            <article className={styles.card}>
                <img  src={article.urlToImage} alt={article.title} />
                <h5>{article.title}</h5>
                <p>{article.description}</p>
                <a href={article.url}>Read more</a>
                </article>)}
        </div>
    )
}

export default HomeComponent;