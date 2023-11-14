const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParse = require("cookie-parser");
const {authMiddleWare} = require('../middlewares/authMiddleware.js')
const {serverLogger} = require('../middlewares/serverLogger.js')

const expressConfig = (app) => {
    app.use(express.static(path.resolve(__dirname, "public")));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors({ origin: 'http://localhost:5173' }));
    app.use(cookieParse());
    app.use(authMiddleWare);
    app.use(serverLogger);
};

module.exports = {expressConfig};