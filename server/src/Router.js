const { Router } = require("express");
const userRouter = require("./controllers/UsersController.js");
const productsRouter = require("./controllers/ProductsController.js");
const apiRouters = require ("./controllers/ApiController.js");

const router = Router();

router.use('/users', userRouter);
router.use('/products', productsRouter);
router.use('/api', apiRouters)

module.exports = router;

