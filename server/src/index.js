const express = require('express');
const constants = require('./constants.js')
const userService = require('./services/userService.js');
const electonicsService = require('./services/electronicsService.js')
const { dbConnect } = require('./lib/dataBase.js')
const { expressConfig } = require('./configs/expressConfig.js')
const { scrape } = require('../web-scrapper/gsmArena.js')
const { APIkey } = require('./APIkey.js')

const app = express();

expressConfig(app);

//connect to DB:
try {
    dbConnect(constants.URL1);
    console.log('Successfully connected to the DB!');
}
catch (err) {
    console.log(err)
}

const sessions = {};

// Endpoints:
app.get('/products', async (req, res) => {

    console.log(` GET ALL products`);

    try {
        const electronics = await electonicsService.getAll();
        res.json(electronics);

    }
    catch (err) {
        res.send('Currently there are not products!')
        console.log(err);
    }
})

app.get('/products/:id', async (req, res) => {

    const id = req.params.id;

    try {
        const electronics = await electonicsService.getOne(id);
        res.json(electronics)
    }
    catch (err) {
        res.send(err)
        console.log(err);
    }
})

app.get('/products/user/:id', async (req, res) => {

    const id = req.params.id;
    try {
        const userDetails = await electonicsService.search(id);
        res.json(userDetails)
    }
    catch (err) {
        res.send(err)
        console.log(err);
    }
})


app.post('/products', async (req, res) => {

    try {
        const product = await electonicsService.create(req.body);
        
        setTimeout(()=>{res.send(JSON.stringify(product))},2000) //simulate delay
        
    }
    catch (err) {
        console.log(err);
        res.send(err)
    }
})

app.put('/products/:id', async (req, res) => {

    const id = req.params.id;

    if (req.body.comment) {
        try {
            const { userName, user_id, content, time, rating } = req.body;
            await electonicsService.updateComments(id, { userName, user_id, content, time, rating });
            res.send(JSON.stringify('Comment added!'));
        }
        catch (err) {
            console.log(err);
            res.send(err)
        }
    }
    else {
        try {
            const product = await electonicsService.updateOne(req.body);
            res.send(JSON.stringify(product));
        }
        catch (err) {
            console.log(err);
            res.send(err)
        }
    }
})

app.delete('/products/:id', async (req, res) => {

    console.log(`DELETE ${req.params.id}`);
    try {
        await electonicsService.deleteOne(req.params.id);
        setTimeout(() => { res.json({ response: `User ID ${req.params.id} successfully Deleted!` }) }, 2000);
    }
    catch (err) {

        res.send(JSON.stringify(err));
        console.log(err);
    }
})


app.post('/autofill', async (req, res) => {

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

app.get('/getWeather', async (req, res) => {

    const url = `http://api.weatherstack.com/current?access_key=${APIkey}&query=Sofia`

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.setHeader('Cache-Control', 'no-store, no-cache')// 'no-store, no-cache, must-revalidate, private')
        res.send(data)
    }
    catch (err) {

        res.send(err.message).status(404)
    }

})


app.post('/users/register', async (req, res) => {

    try {
        const user = await userService.create(req.body)
        setTimeout(() => { res.send(JSON.stringify(user)) }, 3000) // simulate network delay
    }
    catch (err) {
        console.log(err);
        res.send(err)
    }
})

app.post('/users/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const userData = await userService.login(email, password);
        const token = userData.token;
        sessions[token] = true;
        res.json(userData);
    }
    catch (err) {
        res.status(404).json(err);
    }
})

app.post('/users/logout',  (req, res) => {

    console.log('/users/logout post');

    const { authToken } = req.body;

    try {
        if (sessions[authToken]) {

            console.log('Deleting user session', authToken );
            delete sessions[authToken];
            res.json(true)
        }
    }
    catch (err) {
        res.json(false);
    }
    finally {

        console.log('Current sessions: ', sessions);
    }
})

app.post('/users/cart',  async (req, res) => {

    const {_id, cart} = req.body;

    console.log(_id, cart);

    try {
        const updated = await userService.updateUser(_id, cart)

        res.json(updated); // will be needed when 
    }
    catch (err) {
        res.status(404).json(err);
    }
})

// app.get('/users/cart',  async (req, res) => {

//     const {_id, cart} = req.body;

//     try {
//         const updated = await userService.updateUser(_id, cart);

//         console.log(updated);
//     }
//     catch (err) {
//         res.status(404).json(err);
//     }
// })

app.listen(constants.PORT, () => { console.log(`The server is listening on PORT  ${constants.PORT}`); })