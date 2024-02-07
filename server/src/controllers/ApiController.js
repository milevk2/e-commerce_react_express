const { Router } = require("express");
const { scrape } = require("../../web-scrapper/gsmArena.js");
const { CacheManager } = require("../services/APIservices.js");
const { KEY_API_WEATHER, KEY_API_NEWS } = require('../APIkey.js');


const apiRouter = Router();
const newsCache = new CacheManager(8, `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=${KEY_API_NEWS}`, 'news');
const weatherCache = new CacheManager(8, `http://api.weatherstack.com/current?access_key=${KEY_API_WEATHER}&query=Sofia`, 'weather');

async function cacheExpiredChecker(req, res, cacheObject) {

    const reqDateTime = Date.now();

    if (reqDateTime >= cacheObject.getExpiryTime()) {

        try {
            const data = await cacheObject.setCache(reqDateTime);
            console.log(`Sending fresh ${cacheObject.getServiceName()} content!`);
            res.json(data);
        }
        catch (err) {
            res.status(404).json(err);
            console.log(err);
        }
    }
    else {
        console.log(`Sending cached ${cacheObject.getServiceName()} content!`);
        res.send(cacheObject.getCache());
    }
}


apiRouter.post('/autofill', async (req, res) => {

    const { brand, quantity } = req.body;
    console.log(brand, quantity);

    try {
        const response = await scrape(brand, quantity);
        res.json(response);
    }
    catch (err) {

        console.log(err.message);
        res.json(err.message)
    }
})

apiRouter.get('/getWeather', async (req, res) => {

    await cacheExpiredChecker(req, res, weatherCache);
    
})

apiRouter.get('/news', async (req, res) => {

    await cacheExpiredChecker(req, res, newsCache)
    
})

module.exports = apiRouter;