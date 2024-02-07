const { Router } = require("express");
const productsRouter = Router();
const productsService = require('../services/electronicsService.js');

//get products owner by certain user
productsRouter.get('/user/:id', async (req, res, next) => {

    const id = req.params.id;
    try {
        const userDetails = await productsService.search(id);
        res.json(userDetails)
    }
    catch (err) {
        res.send(err)
        console.log(err);
    }
    next();
})

//get details for certain product by id
productsRouter.get('/:id', async (req, res, next) => {

    const id = req.params.id;

    try {
        const electronics = await productsService.getOne(id);
        res.json(electronics)
    }
    catch (err) {
        res.send(err)
        console.log(err);
    }
    next();
})

//edit certain product or add product comment
productsRouter.put('/:id', async (req, res, next) => {

    const id = req.params.id;

    if (req.body.comment) {
        try {
            const { userName, user_id, content, time, rating } = req.body;
            await productsService.updateComments(id, { userName, user_id, content, time, rating });
            res.send(JSON.stringify('Comment added!'));
        }
        catch (err) {
            console.log(err);
            res.send(err)
        }
    }
    else {
        try {
            const product = await productsService.updateOne(req.body);
            res.send(JSON.stringify(product));
        }
        catch (err) {
            console.log(err);
            res.send(err)
        }
    }
    next();
})

productsRouter.delete('/:id', async (req, res,  next) => {

    console.log(`DELETE PRODUCT ID: ${req.params.id}`);
    try {
        await productsService.deleteOne(req.params.id);
       res.json({ response: `User ID ${req.params.id} successfully Deleted!` });
    }
    catch (err) {

        res.send(JSON.stringify(err));
        console.log(err);
    }
    next();
})

productsRouter.get('/', async (req, res,  next) => {

    console.log(` GET ALL products`);

    try {
        const electronics = await productsService.getAll();
        res.json(electronics);

    }
    catch (err) {
        res.send('Currently there are not products!')
        console.log(err);
    }
    next();
})

productsRouter.post('/', async (req, res, next) => {

    try {
        const product = await productsService.create(req.body);

        res.send(JSON.stringify(product));
    }
    catch (err) {
        console.log(err);
        res.send(err)
    }
    next();
})

module.exports = productsRouter;
