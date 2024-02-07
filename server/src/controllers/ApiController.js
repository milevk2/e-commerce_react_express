const { Router } = require("express");
const { CacheManager } = require("../services/APIservices.js");
const { KEY_API_WEATHER, KEY_API_NEWS } = require('../APIkey.js');

const apiRouter = Router();
const newsCache = new CacheManager(8, `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=${KEY_API_NEWS}`);
const weatherCache = new CacheManager(8, `http://api.weatherstack.com/current?access_key=${KEY_API_WEATHER}&query=Sofia`);


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

    const url = `http://api.weatherstack.com/current?access_key=${APIkey}&query=Sofia`

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.setHeader('Cache-Control', 'no-store, no-cache')// 'no-store, no-cache, must-revalidate, private')
        res.send(data)
    }
    catch (err) {

        res.status(404).send(err.message);
    }
})

apiRouter.get('/news', async (req, res) => {

    const reqDateTime = Date.now();

    if (reqDateTime >= newsCache.getExpiryTime()) {

        try {
            const news = await newsCache.setCache(reqDateTime);
            console.log('Sending fresh content!');
            res.json(news);
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        console.log('Sending cached content!');
        res.send(newsCache.getCache());
    }
})