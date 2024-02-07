const express = require('express');
const constants = require('./constants.js')
const { dbConnect } = require('./lib/dataBase.js')
const { expressConfig } = require('./configs/expressConfig.js')

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

app.listen(constants.PORT, () => { console.log(`The server is listening on PORT  ${constants.PORT}`); })