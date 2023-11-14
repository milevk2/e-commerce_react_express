const express = require('express');
const constants = require('./constants.js')
const userService = require('./services/userService.js');
const electonicsService = require('./services/electronicsService.js')
const {dbConnect} = require('./lib/dataBase.js')
const {handlebarsConfig} = require('./configs/handlebarsConfig.js')
const {expressConfig} = require('./configs/expressConfig.js')
const app = express();

handlebarsConfig(app);
expressConfig(app);

//connect to DB:
try {
    dbConnect(constants.URL);
    console.log('Successfully connected to the DB!');
}
catch (err) {
    console.log(err)
}

// Endpoints:
app.get('/', async (req, res) => {

    console.log(` GET ALL products`);

    try {
        const electronics = await electonicsService.getAll();
        res.json((electronics));

    }
    catch (err) {
        res.send('NO USERS')
        console.log(err);
    }
})

app.post('/products', async (req, res) => {

    try {
        const product = await electonicsService.create(req.body);
        res.send(JSON.stringify(product));

    }
    catch (err) {
        console.log(err);
        res.send(err)
    }

})

app.post('/jsonstore/users', async (req, res) => {

    console.log(` POST /jsonstore/users`);
    try {
        const user = await userService.create(req.body)
        setTimeout(() => { res.send(JSON.stringify(user)) }, 3000) // simulate network delay
    }
    catch (err) {
        console.log(err);
        res.send(err)
    }
})
app.get('/jsonstore/users/:id', async (req, res) => {

    const id = req.params.id
    console.log(` GET /jsonstore/users/${id}`);
    try {
        const userDetails = await userService.getUser(id);
        res.send(JSON.stringify(userDetails))
    }
    catch (err) {
        res.send(err)
        console.log(err);
    } 
})

app.put('/products/:id', async (req, res) => {
    console.log(` EDIT ${req.params.id}`);
    try {
        const updated = await electonicsService.updateOne({ ...req.body, _id: req.params.id });
        setTimeout(() => { res.send(JSON.stringify(updated)) }, 2000) //simulate network delay
    }
    catch (err) {
        res.send(err)
        console.log(err);
    }
})

app.delete('/products/:id', async (req, res) => {

    console.log(`DELETE ${req.params.id}`);
    try {
        await electonicsService.deleteOne(req.params.id);
        setTimeout(() => { res.send(JSON.stringify({ response: `User ID ${req.params.id} successfully Deleted!` })) }, 2000);
    }
    catch (err) {

        res.send(JSON.stringify(err));
        console.log(err);
    }
})
app.listen(constants.PORT, () => { console.log(`The server is listening on PORT  ${constants.PORT}`); })