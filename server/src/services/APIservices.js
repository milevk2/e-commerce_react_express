class CacheManager {

    #cache
    #expiryTime
    #hoursInterval
    #fetchUrl
    #serviceName

    constructor(interval_in_hours, fetchUrl, serviceName) {
        this.#cache = null;
        this.#expiryTime = 0;
        this.#hoursInterval = interval_in_hours;
        this.#fetchUrl = fetchUrl;
        this.#serviceName = serviceName;
    }

    getServiceName() {

        return this.#serviceName;
    }

    async setCache(reqDateTime) {

        try {
            const freshData = await this.#fetchData(this.#fetchUrl);
            this.#cache = freshData;
            this.#expiryTime = reqDateTime + this.#hoursInterval * 3600000 ; // 1 hour = 60 minutes * 60 seconds * 1000 milliseconds
            return freshData;
        }
        catch (err) {

            this.#expiryTime = reqDateTime + 1  * 3600000; // extends the expiry time with 1 hour in case of API outages
            throw err;
        }
    }

    async #fetchData(fetchUrl) {

        const response = await fetch(fetchUrl);
        if (!response.ok) throw new Error(`Problem with news fetching! Status: ${response.status} - ${response.statusText}`);

        return await response.json();
    }

    getCache() {

        return this.#cache;
    }

    getExpiryTime() {

        return this.#expiryTime;
    }
}

module.exports = { CacheManager }

