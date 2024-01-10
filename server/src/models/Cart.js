const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    buyQuantity: {

        type: Number,
    },
    image: {
        type: String,
        required: true
    },
})

module.exports = { cartSchema };