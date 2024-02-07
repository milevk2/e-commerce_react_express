const { Router } = require("express");
const userRouter = Router();
const userService = require('../services/userService.js')


const sessions = {};

userRouter.post('/register', async (req, res, next) => {

    try {
        const user = await userService.create(req.body);
        res.send(JSON.stringify(user));
    }
    catch (err) {
        console.log(err);
        res.send(err)
    }
    next();
})

userRouter.post('/login', async (req, res, next) => {

    const { email, password } = req.body;

    try {
        const userData = await userService.login(email, password);
        const token = userData.token;
        sessions[token] = true;
        res.json(userData);
    }
    catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
    next();
})

userRouter.post('/logout', (req, res, next) => {

    const { authToken } = req.body;

    try {
        if (sessions[authToken]) {

            console.log('Deleting user session', authToken);
            delete sessions[authToken];
            res.status(200).json(true);
        }
    }
    catch (err) {
        console.log(`Error occured during logout: ${err}`);
        res.status(404).json(false);
    }
    finally {

        console.log('Current sessions: ', sessions);
    }
    next();
})

userRouter.post('/cart', async (req, res, next) => {

    const { _id, cart } = req.body;

    console.log(_id, cart);

    try {
        const updated = await userService.updateUser(_id, cart)

        res.json(updated);
    }
    catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
    next();
})

module.exports = userRouter;
