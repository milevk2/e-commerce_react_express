const { newsAPI } = require("../APIkey.js");

class CachedNewsManager {

    #cachedNews
    #expiryTime
    #hoursInterval

    constructor(interval_in_hours) {
        this.#cachedNews = null;
        this.#expiryTime = 0;
        this.#hoursInterval = interval_in_hours;
    }


    async setCache(reqDateTime) {

        try {

            const news = await this.#fetchNews();
            this.#cachedNews = news;
            this.#expiryTime = reqDateTime + this.#hoursInterval * 3600000 ; // 1 hour = 60 minutes * 60 seconds * 1000 milliseconds
            return news;
        }
        catch (err) {

            this.#expiryTime = reqDateTime + 1  * 3600000; // extends the expiry time with 1 hour in case of API outages
            throw err;
        }
    }

    async #fetchNews() {

        const response = await fetch(`https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=${newsAPI}`);

        if (!response.ok) throw new Error(`Problem with news fetching! Status: ${response.status} - ${response.statusText}`);

        return await response.json();

    }

    getCache() {

        return this.#cachedNews;
    }

    getExpiryTime() {

        return this.#expiryTime;
    }
}

module.exports = { CachedNewsManager }

